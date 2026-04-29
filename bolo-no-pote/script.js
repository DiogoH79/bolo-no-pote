let carrinho = [];
let formaPagamento = "";

function addCarrinho(nome, preco){
carrinho.push({nome, preco});
renderCarrinho();
}

function renderCarrinho(){

const lista=document.getElementById("listaCarrinho");
const totalEl=document.getElementById("total");
const qtd=document.getElementById("qtdSacola");

lista.innerHTML="";
let total=0;

carrinho.forEach((item,index)=>{

const li=document.createElement("li");
li.className="item-carrinho";

li.innerHTML=`
<span>${item.nome} - R$ ${item.preco.toFixed(2)}</span>
<button class="btn-excluir" onclick="removerItem(${index})">
🗑
</button>

`;

lista.appendChild(li);

total+=item.preco;
});

totalEl.textContent=`Total: R$ ${total.toFixed(2)}`;
qtd.textContent=carrinho.length;
}

function removerItem(index){
carrinho.splice(index,1);
renderCarrinho();
}

function abrirSacola(){
document.getElementById("modalSacola").style.display="block";
}

function fecharSacola(){
document.getElementById("modalSacola").style.display="none";
}

function abrirPagamento(){

if(carrinho.length===0){
alert("Adicione itens primeiro!");
return;
}

document.getElementById("pagamentoArea").style.display="block";
}

function selecionarPagamento(tipo){

formaPagamento=tipo;

if(tipo==="PIX"){
document.getElementById("pixArea").style.display="block";
}else{
enviarWhatsapp();
}
}

function enviarWhatsapp(){

const numero="5534997909676";

let mensagem="🧁 *Novo Pedido*\n\n";
let total=0;

carrinho.forEach(item=>{
mensagem+=`• ${item.nome} - R$ ${item.preco.toFixed(2)}\n`;
total+=item.preco;
});

mensagem+=`\n💰 Pagamento: ${formaPagamento}`;
mensagem+=`\n🧾 Total: R$ ${total.toFixed(2)}`;

window.open(
`https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`,
"_blank"
);
}
