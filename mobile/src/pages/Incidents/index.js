import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    loadIncidents();
  }, [])

  async function loadIncidents() {
    if(loading) return;
    if(total > 0 && incidents.length >= total) return;

    setLoading(true);
    const response = await api.get('incidents', {
      params: { page }
    });

    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
  }

  function navigateToDetail(incident) {
    navigation.navigate('Detail', { incident });
  }

  function renderIncident({item: incident}) {
    return (
      <View style={styles.incident}>
        <Text style={styles.incidentProperty}>NGO:</Text>
        <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

        <Text style={styles.incidentProperty}>Case:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>Value:</Text>
        <Text style={styles.incidentValue}>
            {Intl.NumberFormat('pt-BR', {
              style: 'currency', 
              currency: 'BRL'
            }).format(incident.value)}
        </Text>

        <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(incident)}>
          <Text style={styles.detailsButtonText}>More details</Text>
          <Feather name="arrow-right" size={16} color="#e02041" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total of <Text style={styles.headerTextBold}>{total} cases</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.description}>Choose one of the bases below and save the day!</Text>

      <FlatList
        style={styles.incidentList}
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        renderItem={renderIncident}
        // showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
      />
    </View>
  );
}