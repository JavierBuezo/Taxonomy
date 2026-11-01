// Esquemas originales. No son microfotografías ni representan todas las variantes anatómicas.
const item=(id,name,description,x,y,side)=>({id,name,description,x,y,side});
export const activities=[
{id:'planta',group:'Órganos',title:'Partes de una planta',subtitle:'Del sistema radical al extremo del tallo',diagram:'plant',level:'Inicial',note:'Planta herbácea esquemática. Una yema axilar se encuentra en la axila entre una hoja y el tallo; no en la base de cada folíolo.',items:[
item('flor','Flor','Brote especializado en la reproducción sexual de las angiospermas. Puede incluir sépalos, pétalos, estambres y carpelos.',449,111,'right'),
item('yema','Yema axilar','Brote situado en la axila de una hoja. Puede originar una rama vegetativa o un brote reproductor.',432,260,'right'),
item('hoja','Hoja','Órgano generalmente laminar que participa en fotosíntesis, intercambio gaseoso y transpiración.',335,225,'left'),
item('tallo','Tallo','Eje con nudos y entrenudos que sostiene hojas y órganos reproductores y conecta sus tejidos conductores con la raíz.',445,358,'right'),
item('nudo','Nudo','Región del tallo donde se inserta una hoja. El tramo entre dos nudos consecutivos es un entrenudo.',446,278,'left'),
item('principal','Raíz principal','Eje principal del sistema radical pivotante representado. Procede del desarrollo de la radícula.',440,494,'left'),
item('lateral','Raíz lateral','Ramificación de una raíz. En el desarrollo típico se origina en tejidos internos relacionados con el periciclo.',516,516,'right')
]},
{id:'flor',group:'Órganos',title:'Partes de una flor',subtitle:'Observa una flor en sección longitudinal',diagram:'flower',level:'Inicial',note:'Flor hermafrodita esquemática con ovario súpero. Un estambre consta de antera y filamento; el gineceo está formado por uno o más carpelos.',items:[
item('petalo','Pétalo','Pieza de la corola, a menudo vistosa. Puede contribuir a atraer y orientar a los polinizadores.',321,235,'left'),
item('antera','Antera','Parte del estambre que contiene los sacos polínicos, donde se desarrolla el polen.',558,222,'right'),
item('estigma','Estigma','Región receptora del polen; en condiciones compatibles permite su hidratación y germinación.',450,173,'right'),
item('filamento','Filamento','Parte del estambre que sostiene la antera.',535,310,'right'),
item('estilo','Estilo','Porción que conecta estigma y ovario en la flor representada. Por ella puede crecer el tubo polínico.',450,276,'left'),
item('ovulo','Óvulo','Estructura situada dentro del ovario que contiene el gametófito femenino. Tras la fecundación puede desarrollarse como semilla.',474,401,'right'),
item('ovario','Ovario','Parte basal del carpelo que encierra los óvulos. Su pared contribuye al pericarpo del fruto.',403,410,'left'),
item('sepalo','Sépalo','Pieza del cáliz, generalmente protectora de la flor durante su desarrollo en el botón floral.',355,428,'left'),
item('pedunculo','Pedúnculo floral','Eje que sostiene la flor representada y la conecta con el resto de la planta.',450,541,'right')
]},
{id:'hoja-externa',group:'Órganos',title:'Morfología de la hoja',subtitle:'Reconoce una hoja simple y peciolada',diagram:'leaf',level:'Inicial',note:'Se representa una hoja simple con nerviación pinnada y margen entero. Ni todas las hojas tienen pecíolo ni todas presentan esta nerviación.',items:[
item('apice','Ápice','Extremo distal del limbo, opuesto a su base.',450,105,'right'),
item('limbo','Limbo','Porción laminar de la hoja. Su forma, división y superficie son caracteres descriptivos.',365,291,'left'),
item('margen','Margen','Borde del limbo; puede ser entero, dentado, aserrado, lobulado u ofrecer otras formas.',605,292,'right'),
item('nervio','Nervio principal','Nervio central del que parten nervios secundarios en esta hoja de nerviación pinnada. Contiene tejidos conductores.',449,345,'left'),
item('secundario','Nervio secundario','Ramificación del nervio principal. Forma parte de la red de conducción y sostén del limbo.',492,329,'right'),
item('base','Base del limbo','Región proximal del limbo, donde este se une al pecíolo en la hoja representada.',450,467,'left'),
item('peciolo','Pecíolo','Porción que une el limbo al tallo. Las hojas sin pecíolo se denominan sésiles.',450,525,'right')
]},
{id:'hoja-tejidos',group:'Anatomía',title:'Tejidos de una hoja',subtitle:'Corte transversal de una hoja dorsiventral',diagram:'leafSection',level:'Intermedio',note:'Modelo de hoja dorsiventral de eudicotiledónea, con haz arriba y envés abajo. La distribución de tejidos y estomas cambia entre especies y tipos de hoja. La cutícula no es un tejido celular.',items:[
item('cuticula','Cutícula','Cubierta extracelular rica en cutina y ceras sobre la epidermis. Reduce la pérdida de agua y contribuye a la protección.',339,157,'left'),
item('epidermis-superior','Epidermis adaxial','Capa celular superficial del haz. Protege la hoja y normalmente permite el paso de luz hacia el mesófilo.',500,181,'right'),
item('empalizada','Parénquima en empalizada','Células alargadas, próximas entre sí y ricas en cloroplastos. En esta hoja se sitúan bajo la epidermis del haz y realizan fotosíntesis.',318,250,'left'),
item('xilema','Xilema','Tejido conductor de agua y solutos minerales. En el haz vascular representado ocupa la parte orientada al haz de la hoja.',516,319,'right'),
item('floema','Floema','Tejido que transporta fotoasimilados y otras sustancias entre órganos fuente y sumidero. Aquí se sitúa hacia el envés del haz vascular.',510,381,'right'),
item('esponjoso','Parénquima esponjoso','Células de disposición laxa con espacios intercelulares amplios que facilitan la difusión de gases. También realiza fotosíntesis.',326,398,'left'),
item('epidermis-inferior','Epidermis abaxial','Capa celular superficial del envés. En el modelo contiene estomas; su distribución real depende de la especie.',549,471,'right'),
item('estoma','Estoma','Aparato formado por células oclusivas que delimitan un poro y regulan el intercambio gaseoso y la transpiración.',371,470,'left')
]},
{id:'tallo',group:'Anatomía',title:'Tallo de eudicotiledónea',subtitle:'Corte transversal · estructura primaria',diagram:'stem',level:'Intermedio',note:'Tallo joven con haces colaterales abiertos dispuestos en anillo. No representa un tallo leñoso ni todos los tipos de haces vasculares.',items:[
item('epidermis','Epidermis','Sistema de revestimiento primario del tallo joven. Forma su capa celular más externa.',450,122,'left'),
item('corteza','Parénquima cortical','Tejido fundamental entre la epidermis y la región vascular. Puede intervenir en almacenamiento y fotosíntesis.',334,205,'left'),
item('floema','Floema','Parte externa del haz vascular colateral. Conduce fotoasimilados y otras sustancias orgánicas.',562,223,'right'),
item('cambium','Cámbium fascicular','Tejido meristemático entre xilema y floema en un haz abierto. Puede contribuir al crecimiento secundario.',586,335,'right'),
item('xilema','Xilema','Parte interna del haz vascular colateral, orientada hacia la médula. Participa en conducción de agua y sostén.',531,416,'right'),
item('medula','Médula','Tejido fundamental de la región central del tallo representado; está compuesto principalmente por parénquima.',437,339,'left')
]},
{id:'raiz',group:'Anatomía',title:'Raíz de eudicotiledónea',subtitle:'Corte transversal · zona de diferenciación',diagram:'root',level:'Intermedio',note:'Raíz primaria con xilema central tetrarco, floema alterno y sin médula central desarrollada. Los pelos radicales son prolongaciones de células de la rizodermis.',items:[
item('rizodermis','Rizodermis','Epidermis de la raíz joven. Algunas de sus células forman pelos radicales en la zona de diferenciación.',450,122,'left'),
item('pelo','Pelo radical','Prolongación tubular de una célula de la rizodermis que incrementa la superficie de contacto con el suelo.',655,164,'right'),
item('corteza','Parénquima cortical','Región de tejido fundamental situada entre rizodermis y endodermis. Interviene en almacenamiento y transporte radial.',330,245,'left'),
item('endodermis','Endodermis','Capa más interna de la corteza. Sus bandas de Caspary restringen el paso apoplástico hacia el cilindro vascular.',450,202,'right'),
item('periciclo','Periciclo','Capa situada inmediatamente por dentro de la endodermis. Participa en el origen de raíces laterales.',568,335,'right'),
item('xilema','Xilema','Tejido conductor que ocupa el centro y forma cuatro brazos en este modelo de raíz primaria.',449,391,'left'),
item('floema','Floema','Tejido conductor situado entre los brazos del xilema en esta raíz primaria.',487,293,'right')
]}
];
