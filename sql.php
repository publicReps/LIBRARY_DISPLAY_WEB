<?php
1. CREATE VIEW t_memlogV AS SELECT LogID, t_member.mem_id AS mem_id, t_memlog.mem_cd, t_memlog.Login_time, t_memlog.Logout_time, CONCAT(t_member.mem_firstnm, ' ', t_member.mem_lstnm) AS fullname, departs.Fclty_dept_dscr AS depart FROM t_memlog
LEFT JOIN m_member AS t_member ON t_memlog.mem_cd = t_member.mem_cd
LEFT JOIN m_fcltydept AS departs ON departs.Fclty_dept_cd = t_member.mem_dept

2. CREATE VIEW t_memlogV1 AS SELECT TOP 1 mem_id, mem_cd, fullname, MAX(Login_time) AS login_time, depart FROM t_memlogV WHERE Login_time BETWEEN '2025-02-16 00:00:00.000' AND '2025-10-16 00:00:00.000'
GROUP BY
mem_id,
mem_cd,
fullname,
depart
HAVING
COUNT(mem_cd) > 0
ORDER BY
COUNT(mem_cd) DESC

2.1. DROP TABLE t_memlogV1;

3. CREATE VIEW t_memlogd AS SELECT mem_id, t_memlogV1.mem_cd, fullname, p.member_photo FROM t_memlogV1
LEFT JOIN mem_photo AS p ON p.mem_cd = t_memlogV1.mem_cd

2. php only to>> WITH AggregatedResults AS (
    SELECT 
        t.mem_id, 
        t.mem_cd, 
        MAX(t.Login_time) AS Login_time, 
        MAX(t.Logout_time) AS Logout_time, 
        t.fullname,
		t.depart,
        COUNT(t.mem_cd) AS mem_cd_count
    FROM 
        t_memlogV AS t
	WHERE t.Login_time BETWEEN '2025-06-16 00:00:00.000' AND '2025-10-16 00:00:00.000'

    GROUP BY
        t.mem_id,
        t.mem_cd,
        t.fullname,
		t.depart
    HAVING
        COUNT(t.mem_cd) > 0
)
SELECT TOP 1 
    ar.mem_id, 
    ar.mem_cd, 
    ar.Login_time, 
    ar.Logout_time, 
    ar.fullname,
	ar.depart,
	p.member_photo
FROM 
    AggregatedResults AS ar
LEFT JOIN mem_photo AS p ON p.mem_cd = ar.mem_cd
ORDER BY
    ar.mem_cd_count DESC;


OR 2. 2. php only to>> WITH AggregatedResults AS (
    SELECT 
        t.mem_id, 
        t.mem_cd, 
        CONVERT(DATE, t.Login_time) AS Login_time, 
        t.fullname,
		t.depart,
        COUNT(t.mem_cd) AS mem_cd_count
    FROM 
        t_memlogV AS t
	WHERE CONVERT(DATE, t.Login_time) BETWEEN '2025-04-16' AND '2025-10-16'
    GROUP BY
        t.mem_id,
        t.mem_cd,
        CONVERT(DATE, t.Login_time),
        t.fullname,
		t.depart
    HAVING
        COUNT(t.mem_cd) > 0
)
SELECT TOP 1 
    ar.mem_id, 
    ar.mem_cd, 
    ar.Login_time, 
    ar.fullname,
	ar.depart,
	p.member_photo
FROM 
    AggregatedResults AS ar
LEFT JOIN mem_photo AS p ON p.mem_cd = ar.mem_cd
ORDER BY
    ar.mem_cd_count DESC;
?>