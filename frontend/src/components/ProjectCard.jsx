export default function ProjectCard({project}){
return (
<article className="card p-4 border rounded">
<h3 className="font-semibold">{project.title}</h3>
<p>{project.description}</p>
<div className="meta">{(project.tech||[]).join(', ')}</div>
<div className="actions">
{project.live && <a href={project.live} target="_blank">Live</a>}
{project.repo && <a href={project.repo} target="_blank">Repo</a>}
</div>
</article>
);
}