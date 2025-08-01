import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: "#ecf0f1",
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  text: {
    fontSize: 20,
    color: "#ecf0f1",
    textAlign: "center",
    marginTop: 20,
    lineHeight: 30,
  },
  input: {
    width: "90%",
    borderColor: "#34495e",
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#34495e",
    color: "#ecf0f1",
    marginBottom: 15,
    fontSize: 18,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: "#ecf0f1",
    marginBottom: 5,
    alignSelf: "flex-start",
    marginLeft: "5%",
  },
  buttonContainer: {
    width: "90%",
    marginTop: 10,
  },
});

export default function Index() {
  const [valorfinanciamento, setvalor] = useState("");
  const [parcela, setparcelas] = useState("");
  const [taxajuros, settaxajuros] = useState("");
  const [resultado, setresultado] = useState("");
  const [demaistaxas, setdemaistaxas] = useState("");

  const calcular = () => {
    const valor = parseFloat(valorfinanciamento.replace(',', '.'));
    const parcelas = parseInt(parcela);
    const taxaJuros = parseFloat(taxajuros.replace(',', '.')) / 100;
    const taxasExtras = parseFloat(demaistaxas.replace(',', '.'));

    if (isNaN(valor) || isNaN(parcelas) || isNaN(taxaJuros) || isNaN(taxasExtras) || valor <= 0 || parcelas <= 0) {
      setresultado("Por favor, preencha todos os campos corretamente com valores válidos e maiores que zero.");
      return;
    }

    const taxaMensal = Math.pow(1 + taxaJuros, 1 / 12) - 1;
    let valorParcela;

    if (taxaMensal === 0) {
      valorParcela = valor / parcelas;
    } else {
      valorParcela = (valor * taxaMensal) / (1 - Math.pow(1 + taxaMensal, -parcelas));
    }
    
    const totalPago = valorParcela * parcelas;
    const jurosPagos = totalPago - valor;
    const juroscomtaxa = jurosPagos + taxasExtras;

    setresultado(
      `Valor da Parcela: R$ ${valorParcela.toFixed(2)}\n` +
      `Total Pago: R$ ${totalPago.toFixed(2)}\n` +
      `Juros Pagos: R$ ${jurosPagos.toFixed(2)}\n` +
      `Juros com Taxas: R$ ${juroscomtaxa.toFixed(2)}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de Financiamento</Text>
      
      <Text style={styles.label}>Valor do Financiamento:</Text>
      <TextInput
        placeholder="R$"
        placeholderTextColor="#95a5a6"
        value={valorfinanciamento}
        onChangeText={setvalor}
        keyboardType="numeric"
        style={styles.input}
      />
      
      <Text style={styles.label}>Número de Parcelas:</Text>
      <TextInput
        placeholder="Ex: 12, 24, 36..."
        placeholderTextColor="#95a5a6"
        value={parcela}
        onChangeText={setparcelas}
        keyboardType="numeric"
        style={styles.input}
      />
      
      <Text style={styles.label}>Taxa de Juros (% ao ano):</Text>
      <TextInput
        placeholder="Ex: 5.5 (para 5.5%)"
        placeholderTextColor="#95a5a6"
        value={taxajuros}
        onChangeText={settaxajuros}
        keyboardType="numeric"
        style={styles.input}
      />
      
      <Text style={styles.label}>Outras Taxas (R$):</Text>
      <TextInput
        placeholder="Custos adicionais (opcional)"
        placeholderTextColor="#95a5a6"
        value={demaistaxas}
        onChangeText={setdemaistaxas}
        keyboardType="numeric"
        style={styles.input}
      />
      
      <View style={styles.buttonContainer}>
        <Button
          title="Calcular Financiamento"
          onPress={calcular}
          color="#3498db"
        />
      </View>
      
      {resultado ? (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.text}>{resultado}</Text>
        </View>
      ) : null}
    </View>
  );
}