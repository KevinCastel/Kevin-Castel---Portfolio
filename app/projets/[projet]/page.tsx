'use client'
import 'next';
import { useSearchParams } from 'next/navigation';
import { getHyperlinkProject, getProjectByIndex } from '../api/json/project';
import { useEffect, useState } from 'react';
import { link } from 'fs';

import Image from 'next/image';


import { DescriptionProject, getCanRenderImagesProject, getImagesProject } from '../api/json/project';
import Link from 'next/link';



// FIXME Trouver un moyen de connecter un enum-tag par un identifiant
export default function Page(){
    const [description, setDescription] = useState(Object);

    const searchParamContext = useSearchParams();

    const i = searchParamContext.get('i');

    let project = null;
    if (i){
        project = getProjectByIndex(i);
    }

    // console.log("project :", project);

    // loadDescription(project); //FIXME Réactiver la fonction

    const showImages = getCanRenderImagesProject(project);
    let images = null
    if (showImages){
        images = getImagesProject(project);
    }
    const hyperlinks = getHyperlinkProject(project);
    
    return (
        <main className='w-full h-auto flex flex-col pt-22 relative'>
            <h1 className='h-full min-h-40 w-full flex justify-center items-center text-[400%] text-dark-blue'>{project["name"]}</h1>
            <div className='h-full w-full p-10 pt-0'>
                <div className='h-auto w-auto p-4 flex flex-col gap-2 bg-blue-filters rounded-2xl'>
                    {/* TODO Fait une iteration sur l'introduction afin d'afficher le composant */}
                    {/* <p className='h-auto w-full text-[120%]'>{`${description}`}</p> */}
                    <div className='w-auto h-auto flex flex-col p-2'>
                        <DescriptionProject project={project}/>
                    </div>
                    <hr className='test'/>
                    <div className='h-full w-full min-h-100 p-3 pl-4 bg-cyan rounded-2xl'>
                        <h2 className={`w-full h-auto text-dark-blue pl-3`}>Démonstration du projet :</h2>
                        <div className={`w-full sm:h-auto md:h-full flex flex-col md:items-center sm:pt-4 sm:justify-center`}>
                            { showImages ? (<div className='w-full h-auto items-center md:justify-evenly flex md:flex-row sm:flex-col sm:gap-10 sm:pb-4'>
                                {Object.entries(images).map((img,i )=>{
                                    const title = img[0];
                                    const imageUrl = img[1];
                                    return (<div key={`${i}-img-div`} className='w-auto h-full'>
                                        <h3 key={`${i}-title`} className='w-full h-full text-center p-3 text-[110%] text-dark-blue'>{title}</h3>
                                        <Image key={i.toString()} src={imageUrl} alt={title} height='300' width='300'/>
                                    </div>
                                )
                                })}

                            </div>) : (<div className='h-100 w-full flex justify-center items-center'>
                                        <h3 className='text-dark-blue h-auto w-auto'>Pas d'image</h3>
                                    </div>)}
                        </div>
                    </div>
                </div>
                <div className='w-full h-auto bg-blue-filters rounded-lg p-2 mt-4 flex flex-col gap-2'>
                    <h3 className='text-cyan pl-4'>Liens vers</h3>
                    <div className=' w-auto h-full bg-cyan rounded-xl flex justify-evenly'>
                        {hyperlinks ? Object.entries(hyperlinks).map((link, index)=>{
                            return (<Link className='text-dark-blue w-auto h-full hover:text-blue-filters focus:text-dark-blue' key={index.toString()} href={link[1]}>{link[0]}</Link>);
                        }) : null}
                    </div>
                </div>
            </div>
        </main>
    )
}