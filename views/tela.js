class Tela {
    constructor () {
        const janeiro = new Mes("janeiro");
        janeiro.adicionarLancamento(new Lancamento("Salário", "receita", 5000));
        janeiro.adicionarLancamento(new Lancamento("Aluguel", "despesa", 1000));
        janeiro.adicionarLancamento(new Lancamento("Conta de Luz", "despesa", 200));
        janeiro.adicionarLancamento(new Lancamento("Conta de Água", "despesa", 100));
        janeiro.adicionarLancamento(new Lancamento("Internet", "despesa", 100));
        janeiro.adicionarLancamento(new Lancamento("Alimentação", "despesa", 500));
        janeiro.adicionarLancamento(new Lancamento("Condominio", "despesa", 300));

        const fevereiro = new Mes("fevereiro");
        fevereiro.adicionarLancamento(new Lancamento("Salário", "receita", 5000));
        fevereiro.adicionarLancamento(new Lancamento("Aluguel", "despesa", 1200));
        fevereiro.adicionarLancamento(new Lancamento("Conta de Luz", "despesa", 250));
        fevereiro.adicionarLancamento(new Lancamento("Conta de Água", "despesa", 100));
        fevereiro.adicionarLancamento(new Lancamento("Internet", "despesa", 100));
        fevereiro.adicionarLancamento(new Lancamento("Alimentação", "despesa", 1000));

        const marco = new Mes("março");
        marco.adicionarLancamento(new Lancamento("Salário", "receita", 4000));
        marco.adicionarLancamento(new Lancamento("Aluguel", "despesa", 1200));
        marco.adicionarLancamento(new Lancamento("Conta de Luz", "despesa", 200));
        marco.adicionarLancamento(new Lancamento("Conta de Água", "despesa", 100));
        marco.adicionarLancamento(new Lancamento("Internet", "despesa", 200));
        marco.adicionarLancamento(new Lancamento("Alimentação", "despesa", 1000));
        marco.adicionarLancamento(new Lancamento("Condominio", "despesa", 400));

        const abril = new Mes("abril");
        abril.adicionarLancamento(new Lancamento("Salário", "receita", 4000));
        abril.adicionarLancamento(new Lancamento("Aluguel", "despesa", 1200));
        abril.adicionarLancamento(new Lancamento("Conta de Luz", "despesa", 200));
        abril.adicionarLancamento(new Lancamento("Conta de Água", "despesa", 100));
        abril.adicionarLancamento(new Lancamento("Internet", "despesa", 200));
        abril.adicionarLancamento(new Lancamento("Alimentação", "despesa", 1000));
        abril.adicionarLancamento(new Lancamento("Condominio", "despesa", 400));

        const ano = new Ano();
        ano.adicionarMes(janeiro);
        ano.adicionarMes(fevereiro);
        ano.adicionarMes(marco);
        ano.adicionarMes(abril);
        ano.calcularSaldo();
        this.ano = ano;
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