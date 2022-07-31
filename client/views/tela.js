class Tela {
    constructor () {
        this.init();    
    }

    async init() {

        const response = await fetch("http://localhost:3000/api/lancamentos");
        const lancamentos = await response.json();
        const ano = new Ano();
        ano.adicionarMes(new Mes("janeiro"));
        ano.adicionarMes(new Mes("fevereiro"));
        ano.adicionarMes(new Mes("marco"));
        ano.adicionarMes(new Mes("abril"));
        for (const lancamento of lancamentos) {
            ano.adicionarLancamento(lancamento.mes, new Lancamento(lancamento.categoria, lancamento.tipo, lancamento.valor));
        }
        ano.calcularSaldo();
        this.ano = ano;
        this.redenrizar();
    }
    
    formatarDinheiro (valor) {
        return new Intl.NumberFormat("pt-br", { currency: "BRL", style: "currency"}).format(valor);
    }

    adicionarLancamento () {
        const mes = document.getElementById("mes");
        const categoria = document.getElementById("categoria");
        const tipo = document.getElementById("tipo");
        const valor = document.getElementById("valor");
        this.ano.adicionarLancamento(mes.value, new Lancamento(categoria.value, tipo.value, parseFloat(valor.value)));
        fetch("http://localhost:3000/api/lancamentos", { method: "post", headers: {"content-type": "application/json"}, body: JSON.stringify({ mes: mes.value, categoria: categoria.value, tipo: tipo.value, valor: parseFloat(valor.value)})});
        this.ano.calcularSaldo();
        this.redenrizar();
        mes.value = this.ano.meses[0].nome;
        tipo.value = "receita";
        categoria.value = "";
        valor.value = "";
    }
    
    redenrizar () {
        document.getElementById("app").remove();
        const app = new Div("app");

        const titulo = new h4("Finanças Pessoais");
        app.adicionarElementoFilho(titulo.element);
        const form = new Div("form-lancamento");
        const mesSelect = new Select("mes");
        for (const mes of this.ano.meses) {
            mesSelect.addOption(mes.nome);
        }
        const tipoSelect = new Select("tipo");
        tipoSelect.addOption("receita");
        tipoSelect.addOption("despesa");
        const categoriaInputText = new Input("categoria", "text", "Categoria");
        const valorInputNumber = new Input("valor", "Number", "Valor");
        const adicionarButton = new Button("botao", "Adicionar");
        adicionarButton.addListener(() => {
            this.adicionarLancamento();
        });
        form.adicionarElementoFilho(mesSelect.element);
        form.adicionarElementoFilho(tipoSelect.element);
        form.adicionarElementoFilho(categoriaInputText.element);
        form.adicionarElementoFilho(valorInputNumber.element);
        form.adicionarElementoFilho(adicionarButton.element);
        app.adicionarElementoFilho(form.element);
    
        // grafico
        const grafico = new Grafico(); 
        for (const mes of this.ano.meses) {
            grafico.adicionarColuna(mes.totalizador.saldo, mes.nome);
        }
        app.adicionarElementoFilho(grafico.element);
    
        for (const mes of this.ano.meses) {
            const nomeDoMes = new h4(mes.nome);
            app.adicionarElementoFilho(nomeDoMes.element);
    
            // tabela
            const tabelaLancamentos = new Tabela("tabela-lancamentos");
            tabelaLancamentos.adicionarLinha("th", ["Categoria", "Valor"]);
            for (const lancamento of mes.lancamentos) {
                tabelaLancamentos.adicionarLinha("td", [lancamento.categoria, this.formatarDinheiro(lancamento.getValorString())]);
            }
            tabelaLancamentos.adicionarLinha("th", ["Juros", this.formatarDinheiro(mes.totalizador.juros)]);
            tabelaLancamentos.adicionarLinha("th", ["Rendimentos", this.formatarDinheiro(mes.totalizador.rendimentos)]);
            tabelaLancamentos.adicionarLinha("th", ["Total", this.formatarDinheiro(mes.totalizador.saldo)]);
            app.adicionarElementoFilho(tabelaLancamentos.element);
        }
        const [body] = document.getElementsByTagName("body");
        body.appendChild(app.element);
    }

}