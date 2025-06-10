-- Job experiences
SELECT 'job' AS experience_type, j.id, j.title, j.start_date, j.end_date, j.author_id
FROM api_jobexperience j
JOIN api_jobexperience_skills js ON j.id = js.jobexperience_id
JOIN api_skill s ON s.id = js.skill_id
WHERE s.name = 'c'

UNION

-- Project experiences
SELECT 'project' AS experience_type, p.id, p.title, p.start_date, p.end_date, p.author_id
FROM api_projectexperience p
JOIN api_projectexperience_skills ps ON p.id = ps.projectexperience_id
JOIN api_skill s ON s.id = ps.skill_id
WHERE s.name = 'c'

UNION

-- Education experiences
SELECT 'education' AS experience_type, e.id, e.title, e.start_date, e.end_date, e.author_id
FROM api_educationexperience e
JOIN api_educationexperience_skills es ON e.id = es.educationexperience_id
JOIN api_skill s ON s.id = es.skill_id
WHERE s.name = 'c';
