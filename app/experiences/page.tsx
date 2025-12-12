import 'next';

// Used as position for 
const positionsExperience =  {
    "parentDiv" : {
        "left" : "justify-start pl-0",
        "center" : "justify-center",
        "right" : "justify-end pl-2",
        },
    "subDiv" : {
        "center" : 'bg-green-center-exp rounded-md',
        "left" : 'bg-yellow-left-exp pl-0 rounded-r-lg',
        "right": 'bg-orange-right-exp rounded-l-lg pr-0',
    },
    "date": {
        "left": 'pl-3',
        "right" : 'pr-3',
        "center" : 'pl-3',
    },
    "title":{
        "center":'text-left pl-1',
        "left":'text-left pl-2',
        "right":'text-right pr-2',
    },
    "paragraphe":{
        "center":'text-center',
        "left":'text-left pl-4',
        "right":'text-right pr-4'
    }
};

export default function Experiences(){
    return (
        <main className='w-full h-auto flex flex-col pt-22 pb-5 relative'>
            <div className='w-full h-auto flex p-6 justify-center'>
                <h1 className='h-auto w-auto max-w-200 text-center align-justify'>Depuis maintenant 7 ans, je porte un interêt dans la programmation. J'ai eu l'occasion de travailler sur de nombreux projets ainsi d'acquérir de l'expérience dans de nombreux postes occupés.</h1>
            </div>
            <div className='w-full h-full space-y-5'>
                <Experience pos={"center"} paragraphContent={"Cette formation m'a permis d'explorer la piste de l'informatique ainsi que l'électronique. J'ai dans cet élan de découverte informatique, pu découvrir la programmation et le développement de site"} title={"BAC PRO LYCEE CLEMENT ADER BERNAY (NORMANDIE)"} date='2020 - 2025'/>
                <Experience pos={"left"} paragraphContent={"Durant ce poste, j’ai eu l’occasion d’effectuer des missions comme concepteur développeur d’application avec le framework .net de la technologie C#. En effet, j’ai produis des travaux pratiques accompagné par l’équipe de développeur."} title={"Biolog-ID à Bernay (Normandie) : "} date='2018'/>
                <Experience pos={"right"} paragraphContent={"Chez Axédia, j’ai mené un projet sur WebDev en poste concepteur développeur d’application. Celui-ci m’a donner l’occasion de découvrir l’IDE WebDev avec de l’intégration SQL."} title={"Axédia, Bernay (Normandie)"} date='2019'/>
                <Experience pos={"left"} paragraphContent={"Une fois de plus, Axédia m’a donner l’occasion d’investir et de progresser sur les suites PC Soft. Cette opportunitée m’a permis de mener à bien un logiciel de bureau avec WinDev."} title={"Axédia, Bernay (Normandie) Télétravail"} date='2019'/>
                <Experience pos={"center"} paragraphContent={"Cette formation m’a permis d’explorer la piste informatique ainsi que l’électronique. J’ai dans cet élan de découverte informatique, pu découvrir la programmation et le développement de site."} title={"Pinkyball - developpement d’un jeux video en AUTODIDACTE"} date='2020-2025'/>
                <Experience pos={"center"} paragraphContent={"Cette formation m’a constuit un réseau ainsi que d’explorer le développement fullstack en passant par des technologies Golang, Rust, Javascript pour le développement web. Ces projets ont étaient très souvent réalisés en groupe avec différents collègues de ma promotion."} title={"Zone01, Rouen (Normandie)"} date='2023-2025'/>
                <Experience pos={"left"} paragraphContent={"Durant mon cursus à Zone01, j’ai eu l’occasion avec des collègues de ma promo d’effectuer un stage chez Medikor en tant-que développeur fullstack : Prototype Next.js avec backend ainsi quewordpress."} title={"Medikor, Rouen (Normandie)"} date='2025'/>
            </div>
        </main>
    )
}

// Interface to defined new experience
interface InterfaceExperience{
    pos : string,
    title:string,
    paragraphContent : string,
    date :string,
}

//get specified component for experiences 
function Experience({pos, title, paragraphContent, date}:InterfaceExperience){ //REFACTOR Pourquoi pas déplacer la définition des positions dans une méthode à part ?
    let divExperienceClassName = positionsExperience.parentDiv.center;
    let subDivExperienceClassName = positionsExperience.subDiv.center;
    let hTwoClassName = positionsExperience.title.center;
    let paragraphClassName = positionsExperience.paragraphe.center;
    let hThreeClassName = positionsExperience.date.center;
    if (pos == "left"){
        divExperienceClassName = positionsExperience.parentDiv.left;
        subDivExperienceClassName = positionsExperience.subDiv.left;
        hTwoClassName = positionsExperience.title.left;
        paragraphClassName = positionsExperience.paragraphe.left;
        hThreeClassName = positionsExperience.date.left
    } else if (pos == "right"){
        divExperienceClassName = positionsExperience.parentDiv.right;
        subDivExperienceClassName = positionsExperience.subDiv.right;
        hTwoClassName = positionsExperience.title.right;
        paragraphClassName = positionsExperience.paragraphe.right;
        hThreeClassName = positionsExperience.date.right;
    };
    return  <div className={`w-full h-auto flex ${divExperienceClassName}`}>
                <div className={`h-auto w-auto max-w-130 p-4 ${subDivExperienceClassName}`}>
                    <h2 className={`w-auto text-[110%] ${hTwoClassName}`}>{title}</h2>
                    <h3 className={`h-2 w-full text-[70%] ${hThreeClassName}`}>{date}</h3>
                    <p className={`text-[80%] text-justify p-4 ${paragraphClassName}`}>{paragraphContent}</p>
                </div>
            </div>
}


// function Experience(){
//     return  <div className='w-full h-auto flex justify-center max-w-140'>
//                 <div className='h-auto w-auto bg-green-center-exp p-4 rounded-md'>
//                     <h2 className='w-auto text-[110%]'>BAC PRO LYCEE CLEMENT ADER BERNAY (NORMANDIE)</h2>
//                     <h3 className='text-[80%] text-justify p-2'>Cette formation m'a permis d'explorer la piste de l'informatique ainsi que l'électronique. J'ai dans cet élan de découverte informatique, pu découvrir la programmation et le développement de site</h3>
//                 </div>
//             </div>
// }