export function SkillGroups({ skills }) {
  if (!skills?.length) return null;
  return (
    <div className="skill-grid">
      {skills.map((group) => (
        <section className="skill-group" key={group.category}>
          <h3>{group.category}</h3>
          <ul>
            {group.items.filter(Boolean).map((skill) => <li key={skill}>{skill}</li>)}
          </ul>
        </section>
      ))}
    </div>
  );
}
