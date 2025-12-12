'use server'

import { redirect } from "next/navigation";

import { ProjectCardInterface } from "./page";
import { useRouter } from "next/router";
// import {useRouter} from 'next/navigation'


// https://stackoverflow.com/questions/62995520/how-to-pass-object-as-params-in-router-push-in-nextjs-and-access-that-object-i
export async function updateToProject({projectName, propsProject}:ProjectCardInterface){
    const router = useRouter();
    console.log("data :", propsProject);
    router.push({
        pathname: 'project',
        query:{ data : JSON.stringify(propsProject)}
    })
}