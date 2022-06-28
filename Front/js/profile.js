var usuarioLogado = localStorage.getItem('loggedUser');
// console.log(JSON.parse(usuarioLogado));

// variaveis
let nomeUsuario = JSON.parse(usuarioLogado).nome;
let telefoneUsuario = JSON.parse(usuarioLogado).telefone;
let emailUsuario = JSON.parse(usuarioLogado).email;
let permissaoUsuario = JSON.parse(usuarioLogado).permissao;
let ruaUsuario = JSON.parse(usuarioLogado).endereco;
let idadeUsuario = JSON.parse(usuarioLogado).idade;
let numeroUsuario = JSON.parse(usuarioLogado).numero;
let cpfUsuario = JSON.parse(usuarioLogado).cpf;
let imagemDePerfil = JSON.parse(usuarioLogado).pp;

//mudando atributos
document.getElementById('nomeUsuario').setAttribute('value',nomeUsuario);
document.getElementById('telefoneUsuario').setAttribute('value',telefoneUsuario);
document.getElementById('emailUsuario').setAttribute('value',emailUsuario);
document.getElementById('permissaoUsuario').setAttribute('value',permissaoUsuario);
document.getElementById('ruaUsuario').setAttribute('value',ruaUsuario);
document.getElementById('idadeUsuario').setAttribute('value',idadeUsuario);
document.getElementById('numeroUsuario').setAttribute('value',numeroUsuario);
document.getElementById('cpfUsuario').setAttribute('value',cpfUsuario);
document.getElementById('nomeAbaixoDaPP').innerHTML = nomeUsuario;
document.getElementById('emailAbaixoDaPP').innerHTML = emailUsuario;
document.getElementById('ppUsuario').src = imagemDePerfil;