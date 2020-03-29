import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, TouchableOpacity, Text, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';


import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;
  const message = `Hi! I'd like to help the the case '${incident.title}' with the ammount of R$ ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}`;

  function navigateBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: 'Hero of the case: Cachorro atropelado',
      recipients: ['jorgeluizandrade@outlook.com'],
      body: message,
    })
  }

  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#e02041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>NGO:</Text>
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
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Save the day!</Text>
        <Text style={styles.heroTitle}>Be the hero for this case</Text>

        <Text style={styles.heroTitle}>Contact:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} disabled={!incident.whatsapp} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>Whatsapp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View >
  );
}