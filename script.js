function gerarSenha(){

    const tamanho = Number(document.getElementById("tamanho").value);

    let caracteres = "";

    if(document.getElementById("maiusculas").checked)
        caracteres += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if(document.getElementById("minusculas").checked)
        caracteres += "abcdefghijklmnopqrstuvwxyz";

    if(document.getElementById("numeros").checked)
        caracteres += "0123456789";

    if(document.getElementById("simbolos").checked)
        caracteres += "!@#$%&*()_-+=<>?/{}[]";

    if(caracteres.length === 0){
        alert("Selecione pelo menos uma opção.");
        return;
    }

    let senha = "";

    const array = new Uint32Array(tamanho);
    crypto.getRandomValues(array);

    for(let i=0;i<tamanho;i++){
        senha += caracteres[array[i] % caracteres.length];
    }

    document.getElementById("senha").value = senha;

    verificarForca(senha);
}

function copiarSenha(){

    const senha = document.getElementById("senha");

    senha.select();
    senha.setSelectionRange(0,99999);

    navigator.clipboard.writeText(senha.value);

    alert("Senha copiada!");
}

function verificarForca(senha){

    let pontos = 0;

    if(senha.length >= 12) pontos++;
    if(/[A-Z]/.test(senha)) pontos++;
    if(/[a-z]/.test(senha)) pontos++;
    if(/[0-9]/.test(senha)) pontos++;
    if(/[^A-Za-z0-9]/.test(senha)) pontos++;

    const texto = document.getElementById("forca");

    if(pontos <= 2){
        texto.innerHTML = "🔴 Senha Fraca";
        texto.style.color = "red";
    }else if(pontos <=4){
        texto.innerHTML = "🟡 Senha Média";
        texto.style.color = "orange";
    }else{
        texto.innerHTML = "🟢 Senha Forte";
        texto.style.color = "green";
    }
}
