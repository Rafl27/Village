var usuarioLogado = localStorage.getItem('loggedUser');
let nomeUsuario = JSON.parse(usuarioLogado).nome;

document.getElementById('mensagemDeBoasVindas').innerHTML = 'Seja bem-vindo ao Village ' + nomeUsuario;