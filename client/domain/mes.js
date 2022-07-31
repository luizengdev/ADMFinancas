class Mes {

    constructor(nome) {
        if (nome === "") throw new Error("Mês Inválido: o nome é obrigatório");
        this.nome = nome;
        this.saldoInicial = 0;
        this.totalizador = { saldo: 0, juros: 0, rendimentos: 0, receitas: 0, despesas: 0, distribuicaoDeDespesas: [] };
        this.lancamentos = [];
    }

    arredondar(valor) {
        return Math.round(valor * 100) / 100;
    }

    adicionarLancamento(lancamento) {
        this.lancamentos.push(lancamento);
    }

    calcularSaldo() {
        this.totalizador = { saldo: 0, juros: 0, rendimentos: 0, receitas: 0, despesas: 0, distribuicaoDeDespesas: [] };
        this.totalizador.saldo = this.saldoInicial;
        this.apurarReceitas();
        this.apurarDespesas();
        this.distribuirDespesas();
        this.apurarJuros();
        this.apurarRendimentos();
    }

    apurarReceitas() {
        for (const lancamento of this.lancamentos) {
            if (lancamento.tipo === "receita") {
                this.totalizador.saldo += lancamento.valor;
                this.totalizador.receitas += lancamento.valor;
            }
        }
    }

    apurarDespesas() {
        for (const lancamento of this.lancamentos) {
            if (lancamento.tipo === "despesa") {
                this.totalizador.saldo -= lancamento.valor;
                this.totalizador.despesas += lancamento.valor;
            }
        }
    }

    distribuirDespesas() {
        const distribuicaoDeDespesas = [];
        for (const lancamento of this.lancamentos) {
            if (lancamento.tipo === "despesa") {
                const percentual = this.arredondar((lancamento.valor / this.totalizador.despesas) * 100);
                distribuicaoDeDespesas.push({ categoria: lancamento.categoria, percentual });
            }
        }
        this.totalizador.distribuicaoDeDespesas = distribuicaoDeDespesas;
    }

    calcularJuros(valor) {
        const juros = this.arredondar(valor * 0.1);
        return juros;
    }

    // calcular juros que foram apurados no mês.
    apurarJuros() {
        if (this.totalizador.saldo < 0) {
            this.totalizador.juros = this.calcularJuros(this.totalizador.saldo);
            this.totalizador.saldo = this.arredondar(this.totalizador.saldo + this.totalizador.juros);
        }
    }

    calcularRendimentos(valor) {
        const rendimentos = this.arredondar(valor * 0.005);
        return rendimentos;
    }

    // calcular rendimentos que foram apurados no mẽs.
    apurarRendimentos() {
        if (this.totalizador.saldo > 0) {
            this.totalizador.rendimentos = this.calcularRendimentos(this.totalizador.saldo);
            this.totalizador.saldo = this.arredondar(this.totalizador.saldo + this.totalizador.rendimentos);
        }
    }

}