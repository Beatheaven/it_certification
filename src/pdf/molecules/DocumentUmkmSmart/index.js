import React from 'react';
import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import PropTypes from 'prop-types';

import { Footer, Header, Score, Divider, ClassCategory } from 'pdf/atoms';

import styles from './styles';

const DocumentUmkmSmart = ({ data, dataLegend, imageChart }) => {
  const { category, score, date, name, business, omzet } = data;

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <Header />
        <View style={styles.section}>
          <Text style={styles.message}>
            {`Selamat ${name} Skor Indeks Kesiapan Anda adalah ${score} - Sehingga tergolong dalam kelas kategori Usaha ${omzet} ${category}`}
          </Text>
          <Score category={category} />
          <Text style={styles.notes}>Berdasarkan hasil survey {date}</Text>
        </View>
        <View style={styles.section}>
          <Divider fixed />
          <Text style={styles.body}>Pemilik usaha {business}</Text>
        </View>
        <View style={styles.section}>
          <Divider color="#DADADA" />
        </View>
        <View style={[styles.section, styles.row]}>
          <View style={[styles.col, styles.colLeft]}>
            <Image src={imageChart} />
          </View>
          <View style={[styles.col, styles.colRight]}>
            <Text style={styles.title}>Kategori Kelas</Text>
            <ClassCategory score={score} />
          </View>
        </View>
        <Footer />
      </Page>
    </Document>
  );
};

DocumentUmkmSmart.propTypes = {
  data: PropTypes.object,
  dataLegend: PropTypes.array,
  imageChart: PropTypes.string
};

DocumentUmkmSmart.defaultProps = {
  data: {},
  dataLegend: [],
  imageChart: ''
};

export default DocumentUmkmSmart;
