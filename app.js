const STORAGE_KEY = "pasteleria_delicatessen_v1";

const defaults = {
  brandName: "Mi Pastelería",
  brandMark: "M",
  brandTag: "Pastelería & Delicatessen",
  heroEyebrow: "Hecho con amor · hecho para disfrutar",
  heroTitle: "Pequeños placeres,<br><em>momentos inolvidables.</em>",
  heroText: "Pastelería artesanal y delicatessen seleccionada para convertir cada ocasión en algo especial.",
  heroCardText: "Dulce & delicado",
  catalogTitle: "Delicias para cada momento",
  catalogSubtitle: "Elegí tu favorito, conocé sus detalles y hacé tu pedido directamente por WhatsApp.",
  whatsapp: "5491100000000",
  colors: {
    primary:"#7a4052", secondary:"#b77a88", background:"#fffaf7", soft:"#f7ece8",
    text:"#3e3032", muted:"#806f72", accent:"#d7a36f", white:"#ffffff"
  },
  products: [
    {id:1,name:"Torta artesanal",category:"Pastelería",description:"Una creación delicada, fresca y preparada especialmente para compartir.",price:"Consultar",image:""},
    {id:2,name:"Box delicatessen",category:"Delicatessen",description:"Una selección especial para regalar, agasajar o disfrutar en casa.",price:"Consultar",image:""},
    {id:3,name:"Mini dulces",category:"Dulces",description:"Pequeñas delicias artesanales ideales para mesas dulces y celebraciones.",price:"Consultar",image:""},
    {id:4,name:"Cookies premium",category:"Dulces",description:"Cookies caseras con una presentación elegante y sabores irresistibles.",price:"Consultar",image:""},
    {id:5,name:"Mesa dulce",category:"Eventos",description:"Opciones personalizadas para cumpleaños, reuniones y momentos especiales.",price:"Consultar",image:""},
    {id:6,name:"Especial de la casa",category:"Especiales",description:"Consultá las propuestas disponibles de esta semana.",price:"Consultar",image:""}
  ]
};

let state = loadState();
let activeCategory = "Todos";

const $ = id => document.getElementById(id);

function loadState(){
  try{
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved ? {...defaults,...saved,colors:{...defaults.colors,...saved.colors},products:saved.products||defaults.products} : structuredClone(defaults);
  }catch(e){ return structuredClone(defaults); }
}
function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

function applyColors(){
  const root=document.documentElement;
  Object.entries(state.colors).forEach(([k,v])=>root.style.setProperty("--"+camelToKebab(k),v));
}
function camelToKebab(s){return s.replace(/[A-Z]/g,m=>"-"+m.toLowerCase())}
function waUrl(message="Hola! Quisiera hacer un pedido."){
  return `https://wa.me/${String(state.whatsapp).replace(/\D/g,"")}?text=${encodeURIComponent(message)}`;
}
function render(){
  applyColors();
  $("brandName").textContent=state.brandName;
  $("brandMark").textContent=state.brandMark;
  $("brandTag").textContent=state.brandTag;
  $("heroEyebrow").textContent=state.heroEyebrow;
  $("heroTitle").innerHTML=state.heroTitle;
  $("heroText").textContent=state.heroText;
  $("heroCardText").textContent=state.heroCardText;
  $("catalogTitle").textContent=state.catalogTitle;
  $("catalogSubtitle").textContent=state.catalogSubtitle;
  $("footerName").textContent=state.brandName;
  $("heroWhatsapp").href=waUrl();
  $("ctaWhatsapp").href=waUrl("Hola! Quisiera consultar por sus productos.");
  $("year").textContent=new Date().getFullYear();
  renderCategories();
  renderProducts();
}
function renderCategories(){
  const cats=["Todos",...new Set(state.products.map(p=>p.category).filter(Boolean))];
  $("categoryBar").innerHTML=cats.map(c=>`<button class="category ${c===activeCategory?"active":""}" data-category="${esc(c)}">${esc(c)}</button>`).join("");
  document.querySelectorAll(".category").forEach(b=>b.onclick=()=>{activeCategory=b.dataset.category;renderCategories();renderProducts()});
}
function renderProducts(){
  const list=activeCategory==="Todos"?state.products:state.products.filter(p=>p.category===activeCategory);
  $("emptyState").hidden=list.length!==0;
  $("products").innerHTML=list.map(p=>{
    const image=p.image?`<img src="${escAttr(p.image)}" alt="${escAttr(p.name)}" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'">`:"";
    return `<article class="product">
      <div class="product-image">${image}<div class="product-placeholder" ${p.image?'style="display:none"':''}>✦</div></div>
      <div class="product-body">
        <span class="product-category">${esc(p.category||"Especial")}</span>
        <h3>${esc(p.name)}</h3>
        <p>${esc(p.description)}</p>
        <div class="product-bottom"><span class="price">${esc(p.price||"Consultar")}</span>
        <a class="btn btn-primary order-btn" target="_blank" rel="noopener" href="${waUrl(`Hola! Quisiera hacer un pedido de: ${p.name}.`)}">Hacer pedido</a></div>
      </div>
    </article>`;
  }).join("");
}
function esc(s=""){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function escAttr(s=""){return esc(s)}

function openModal(id){$(id).classList.add("show");$(id).setAttribute("aria-hidden","false")}
function closeModal(id){$(id).classList.remove("show");$(id).setAttribute("aria-hidden","true")}

$("adminOpen").onclick=()=>openModal("adminModal");
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>closeModal(b.dataset.close));
document.querySelectorAll(".modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)m.classList.remove("show")}));

$("loginBtn").onclick=()=>{
  if($("adminPassword").value==="luc26"){
    $("adminPassword").value="";$("loginError").textContent="";
    closeModal("adminModal");fillEditor();openModal("editorModal");
  }else $("loginError").textContent="Clave incorrecta.";
};
$("adminPassword").addEventListener("keydown",e=>{if(e.key==="Enter")$("loginBtn").click()});

document.querySelectorAll(".tab").forEach(tab=>tab.onclick=()=>{
  document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));
  document.querySelectorAll(".tab-content").forEach(x=>x.classList.remove("active"));
  tab.classList.add("active");$("tab-"+tab.dataset.tab).classList.add("active");
});

const generalFields=["brandName","brandMark","brandTag","heroEyebrow","heroTitle","heroText","heroCardText","catalogTitle","catalogSubtitle","whatsapp"];
function fillEditor(){
  generalFields.forEach(k=>$("edit"+k.charAt(0).toUpperCase()+k.slice(1)).value=state[k]);
  Object.entries(state.colors).forEach(([k,v])=>$("color"+k.charAt(0).toUpperCase()+k.slice(1)).value=v);
  renderProductEditor();
}
function readGeneral(){
  generalFields.forEach(k=>state[k]=$("edit"+k.charAt(0).toUpperCase()+k.slice(1)).value);
  Object.keys(state.colors).forEach(k=>state.colors[k]=$("color"+k.charAt(0).toUpperCase()+k.slice(1)).value);
}
function renderProductEditor(){
  $("productEditorList").innerHTML=state.products.map((p,i)=>`
    <div class="editor-product">
      <img src="${escAttr(p.image||"")}" onerror="this.style.opacity='0'" alt="">
      <div class="editor-product-fields">
        <input data-i="${i}" data-k="name" value="${escAttr(p.name)}" placeholder="Nombre">
        <input data-i="${i}" data-k="category" value="${escAttr(p.category)}" placeholder="Categoría">
        <input data-i="${i}" data-k="description" value="${escAttr(p.description)}" placeholder="Descripción">
        <input data-i="${i}" data-k="price" value="${escAttr(p.price)}" placeholder="Precio / Consultar">
        <input data-i="${i}" data-k="image" value="${escAttr(p.image)}" placeholder="URL de la foto">
      </div>
      <button class="delete-product" data-delete="${i}">Eliminar</button>
    </div>`).join("");
  document.querySelectorAll("[data-i]").forEach(inp=>inp.oninput=()=>state.products[Number(inp.dataset.i)][inp.dataset.k]=inp.value);
  document.querySelectorAll("[data-delete]").forEach(b=>b.onclick=()=>{state.products.splice(Number(b.dataset.delete),1);renderProductEditor()});
}
$("addProductBtn").onclick=()=>{
  state.products.push({id:Date.now(),name:"Nuevo producto",category:"Especial",description:"Escribí aquí la descripción del producto.",price:"Consultar",image:""});
  renderProductEditor();
};
$("saveBtn").onclick=()=>{
  readGeneral();saveState();render();closeModal("editorModal");toast("Cambios guardados");
};
$("resetBtn").onclick=()=>{
  if(confirm("¿Restaurar todos los datos originales?")){state=structuredClone(defaults);saveState();fillEditor();render();toast("Diseño restaurado");}
};
function toast(msg){
  const t=$("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2300);
}
const toastStyle=document.createElement("style");
toastStyle.textContent="#toast{position:fixed;left:50%;bottom:24px;transform:translate(-50%,20px);background:var(--primary);color:#fff;padding:12px 20px;border-radius:999px;font-size:11px;font-weight:700;letter-spacing:.5px;opacity:0;pointer-events:none;transition:.25s;z-index:100}#toast.show{opacity:1;transform:translate(-50%,0)}";
document.head.appendChild(toastStyle);

render();
