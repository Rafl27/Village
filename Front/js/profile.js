var usuarioLogado = localStorage.getItem('loggedUser');
// console.log(JSON.parse(usuarioLogado));

// variaveis
let nomeUsuario = JSON.parse(usuarioLogado).nome;
let telefoneUsuario = JSON.parse(usuarioLogado).telefone;
let emailUsuario = JSON.parse(usuarioLogado).email;
let permissaoUsuario = JSON.parse(usuarioLogado).permissao;
let ruaUsuario = JSON.parse(usuarioLogado).endereco;


//mudando atributos
document.getElementById('nomeUsuario').setAttribute('value',nomeUsuario);
document.getElementById('telefoneUsuario').setAttribute('value',telefoneUsuario);
document.getElementById('emailUsuario').setAttribute('value',emailUsuario);
document.getElementById('permissaoUsuario').setAttribute('value',permissaoUsuario);
document.getElementById('ruaUsuario').setAttribute('value',ruaUsuario);
