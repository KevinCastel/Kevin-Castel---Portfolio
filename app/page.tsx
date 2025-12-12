import Image from "next/image";

import GodotEngine from '@/public/godot-engine-svgrepo.svg'


export default function Home() {
  return ( <main className="w-full h-auto flex flex-col pt-22 relative">
    <div className="w-full min-h-30 max-h-50 h-40 flex justify-center items-center relative">
      <h1 className="h-auto w-auto text-6xl text-dark-blue">Kevin Castel</h1>
    </div>
    <AboutMe/>
    <AboutMyLastProject/>
  </main>);
}

function AboutMe(){
  return (<section className="w-full h-auto text-light-gray bg-purple rounded-t-lg relative">
    <div className="w-full h-full p-4">
      <h2 className="text-center text-2xl"> À propos de moi ?</h2>
      <p className="w-full h-auto p-4 text-center">Mon exploration et ma passion pour la programmation à débuté il y a 7ans.
        En effet, c’est durant mon Bac Pro Système Numérique OPTION Réseau que j’ai découvert la programmation. Par la suite, cela m’a mené à créer des projets personnel gravitationnants à des projets professionnel.</p>
    </div>
    <div className="w-full h-10 bg-dark-pink rounded-t-lg"/>
  </section>);
}

function AboutMyLastProject(){
  return (<section className="w-full h-auto p-4 pt-0 text-light-gray bg-dark-pink">
      <h2 className=" text-center text-2xl">Mon projet le plus conséquent ?</h2>
      <p className="w-full h-30 p-4 text-center">PinkyBall est un projet catégorisé jeux-vidéo puisque produit avec Godot Engine 3 et 4. Ce projet evolue
                                                continuellement en fonction de ce que je souhaite développé comme un outils ou bien une fonctionnalité 
                                                tels-que l’implémentation du réseau</p>
      <h3 className="w-full h-auto text-center text-cyan">Capture d'écran durant diffèrentes parties de Pinkyball</h3>
      <ScreenshotsPinkyBall/>
      <ToolsPinkyball/>
    </section>);
}


function ScreenshotsPinkyBall(){
  const pictureSize = 200;
  return (<div className="w-full h-auto flex flex-row justify-evenly relative p-4">
        <Image width={pictureSize} height={pictureSize} src={"https://img.itch.zone/aW1hZ2UvMTQ1MDUwMC84NjMwMjExLnBuZw==/original/onle4Q.png"} alt="Capture d'écran du jeu Pinkyball mode platforme"/>
        <Image width={pictureSize} height={pictureSize} src={"https://img.itch.zone/aW1hZ2UvMTQ1MDUwMC8xMTE4MDcxNy5wbmc=/original/sRsqCo.png"} alt="Capture d'écran du jeu Pinkyball mode personnage"/>
        <Image width={pictureSize} height={pictureSize} src={"https://img.itch.zone/aW1hZ2UvMTQ1MDUwMC84NjMwMjEzLnBuZw==/original/uNu%2BI%2B.png"} alt={"Seconde capture d'écran du jeu Pinkyball mode platforme"}/>
      </div>)
}

function ToolsPinkyball(){
  const sizeSVG = 40;
  const toolsContainerClassname = "h-full w-auto flex flex-col items-center";
  return (<div className="w-full h-auto flex flex-row justify-evenly items-center relative p-4">
        <div className={toolsContainerClassname}>
          <div className="h-auto w-auto max-h-11">
            {/* FIXME Problème de couleur sur ce SVG */}
            <Image className="" width={sizeSVG} height={sizeSVG} src={"godotengine-svgrepo-com.svg"} alt="Logo Godot Engine"/>
          </div>
          <a href="https://godotengine.org/">Accéder à Godot Engine</a>
        </div>
        <div className={toolsContainerClassname}>
          <Image  width={sizeSVG} height={sizeSVG} src={"/pinkyball.png"} alt="Logo PinkyBall" />
          <a href="https://invitations.itch.io/pinkyball">Accéder à PinkyBall</a>
        </div>
      </div>)
}