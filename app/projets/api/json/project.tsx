import Projects from "./projects.json"


//get specific project
export function getProjectByIndex(i:string) : Object{
    return Projects.projects[i];
}

// Returns all projects from the json file
export function getProjects() : Object{
    return Projects.projects;
}
