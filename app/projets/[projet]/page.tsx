'use client'
import 'next';
import { useSearchParams } from 'next/navigation';
import { getProjectByIndex } from '../api/json/project';

export default function Page(){
    // FIXME Charger la query hidden pour les données du projet
    const searchParamContext = useSearchParams();

    const i = searchParamContext.get('i');
    // TODO Affiche les informations du projet
    let projects = null;
    if (i){
        projects = getProjectByIndex(i);
        console.log("projects :", projects);
    }

    return (
        <main className='w-full h-auto flex flex-col pt-22 relative'>
            <h1>Bonjour</h1>
            {/* TODO Afficher les informations pour les projets */}
        </main>
    )
}