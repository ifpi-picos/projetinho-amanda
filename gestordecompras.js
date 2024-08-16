 const listaCompras = [];

function adicionarItem() {
  const nome = prompt("\nDigite o nome do item: ");
  const quantidade = Number(prompt("Digite a quantidade: "));
  const categoria = prompt("Digite a categoria: ");

  if (!nome || !quantidade || !categoria) {
    //lê-se: se não nome ou não quantidade ou não categoria, então...
    alert("Todos os campos são obrigatórios!");
    return;
  }

  const novoItem = {
    nome: nome,
    quantidade: quantidade,
    categoria: categoria,
    status: "não comprado", //definição do status inicial
  };

  listaCompras.push(novoItem);
  console.log("Item adicionado com sucesso!");
}

function listarItens() {
  const opcaoOrdenar = prompt(
    "Ordenar por: (1) alfabética, (2) categoria, (3) quantidade",
  );
  let listaOrdenada = listaCompras.slice(); //método slice pra criar uma nova lista com os elementos da listaCompras (isso p não modificar o original quando for ordenar)

  if (opcaoOrdenar === "2") {
    listaOrdenada.sort((a, b) => a.categoria.localeCompare(b.categoria));
  } else if (opcaoOrdenar === "3") {
    listaOrdenada.sort((a, b) => a.quantidade - b.quantidade);
  } else {
    listaOrdenada.sort((a, b) => a.nome.localeCompare(b.nome));
  }
  //método sort para ordenar (a função de comparação determina a ordem)

  const opcaoFiltro = prompt(
    "Filtrar por: (1) todas, (2) categoria, (3) status",
  );

  if (opcaoFiltro === "2") {
    const categoria = prompt("Digite a categoria: ");
    listaOrdenada = listaOrdenada.filter(
      (item) => item.categoria === categoria,
    );
    /*método filter cria uma nova lista com os elementos que atendem ao criterio do filtro;
    listaOrdenada recebe a filtragem da categoria do item atual com a que o usuário digitou (a categoria atual que for igual à categoria digitada vai ser filtrada e armazenada em listaOrdenada)*/
  } else if (opcaoFiltro === "3") {
    const status = prompt("Digite o status (comprado/não comprado):");
    listaOrdenada = listaOrdenada.filter((item) => item.status === status);
  }
  console.log("Lista de compras: ");
  listaOrdenada.forEach((item) => console.log(item));
}
//forEach para percorrer sobre cada item e imprimir suas informações

function editarItem() {
  const itemEditar = prompt("Digite o item a ser editado: ");
  const index = listaCompras.findIndex((item) => item.nome === itemEditar);
  //findIndex para percorrer listaCompras em busca de um item que o nome seja igual ao digitado, se encontrar o índice é armazenado em index; caso contrário, retornará -1.

  if (index !== -1) {
    //se o index for diferente de -1
    const novoNome = prompt("Novo nome: ");
    const novaQuantidade = prompt("Nova quantidade: ");
    const novaCategoria = prompt("Nova categoria: ");

    listaCompras[index] = {
      //a partir do índice acessa na lista
      nome: novoNome || listaCompras[index].nome,
      quantidade: novaQuantidade || listaCompras[index].quantidade,
      categoria: novaCategoria || listaCompras[index].categoria,
      status: listaCompras[index].status, //status não será alterado, por isso só acessa o atual na lista.
    };
    //nome, categoria e quantidade: se não forem alterados, permanecem os mesmos, por isso usamos OU (retorna o primeiro true); a parte de 'status' será mantida.

    console.log("Item editado com sucesso!");
  } else {
    console.log("Item não encontrado!"); //caso o índice retorne -1.
  }
}

function removerItem() {
  const itemRemover = prompt("Digite o item a ser removido: ");
  const index = listaCompras.findIndex((item) => item.nome === itemRemover);

  if (index !== -1) {
    const confirmacao = prompt(
      `Tem certeza que deseja remover o item "${itemRemover}"? Digite "S" para SIM ou "N" para NÃO: `,
    );

    if (confirmacao.toLowerCase() === "s") {
      //prompt já convertido p minúsculo
      listaCompras.splice(index, 1); //splice p remover o item: a partir do 'index' 1 elemento
      console.log(`Item "${itemRemover}" removido com sucesso!`);
    } else if (confirmacao.toLowerCase() === "n") {
      console.log("Remoção cancelada.");
    } else {
      console.log("Opção inválida! Por favor, digite 'S' ou 'N'.");
    }
  } else {
    console.log("Item não encontrado na lista.");
  }
}

function marcarItem() {
  const itemMarcar = prompt("Digite o item a ser marcado: ");
  const index = listaCompras.findIndex((item) => item.nome === itemMarcar);
  //findIndex p procurar um item em listaCompras que seja igual ao item digitado, se encontrar o índice é armazenado; se não, retorna -1.

  if (index !== -1) {
    //se lê: se o status do item na posição 'index' for igual a 'comprado', então altera o status.
    if (listaCompras[index].status === "comprado") {
      listaCompras[index].status = "não comprado";
    } else {
      //caso esteja como 'não comprado', altera
      listaCompras[index].status = "comprado";
    }
    console.log(
      `Status do item "${itemMarcar}" alterado para "${listaCompras[index].status}" com sucesso!,
    `);
  } else {
    console.log("Item não encontrado.");
  }
}
//listaCompras[index].status está funcioanndo como uma variável

function resumoLista() {
  const totalItens = listaCompras.length; //.length p retornar o número de elementos (itens) de listaCompras
  const itensPorCategoria = {}; //objeto vazio p armazenar essa contagem dos itens

  //verificação de categorias
  listaCompras.forEach((item) => {
    itensPorCategoria[item.categoria] =
      (itensPorCategoria[item.categoria] || 0) + 1;
  });
  /*forEach percorre cada elemento e a cada iteração o elemento é armazenado em 'item';
'item.categoria' acessa a categoria atual do item em 'itensPorCategoria';
na parte do OU (basta que uma seja verdade p incrementar 1): é verificado se já tem uma categoria com aquele nome ou se não, de toda forma, será incrementado +1 (se tem 6 itens com aquela categoria, soma +1)
*/

  //verificação de status
  const itensComprados = listaCompras.filter(
    (item) => item.status === "comprado",
  ).length;
  const itensNaoComprados = totalItens - itensComprados;
  /*const 1: filter p filtrar na listaCompras
   */

  console.log("Resumo da lista de compras: ");
  console.log(`Total de itens: ${totalItens}`);
  console.log("Itens por categoria:", itensPorCategoria);
  console.log(`Itens comprados: ${itensComprados}`);
  console.log(`Itens não comprados: ${itensNaoComprados}`);
}

function menu() {
  while (true) {
    const opcao = prompt(`
      OPÇÕES:
      1. Adicionar item
      2. Listar itens
      3. Editar item
      4. Remover item
      5. Marcar item como comprado
      6. Resumo da lista
      7. Sair
      Digite um número como opção: `);

    switch (opcao) {
      case "1":
        adicionarItem();
        break;
      case "2":
        listarItens();
        break;
      case "3":
        editarItem();
        break;
      case "4":
        removerItem();
        break;
      case "5":
        marcarItem();
        break;
      case "6":
        resumoLista();
        break;
      case "7":
        console.log("Programa encerrado!");
        return;
      default:
        console.log("Opção inválida!");
    }
  }
}

menu();