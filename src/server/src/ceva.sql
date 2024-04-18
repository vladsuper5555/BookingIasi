CREATE OR REPLACE package pachet_exceptii IS
    student_inexistent exception;    
    student_curs_inexistent exception;
    curs_inexistent exception;
    nota_invalida exception;

    pragma exception_init(student_inexistent, -20001);
    pragma exception_init(curs_inexistent, -20002);
    pragma exception_init(student_curs_inexistent, -20003);
    pragma exception_init(nota_invalida, -20004);
END pachet_exceptii;
/

CREATE OR REPLACE TRIGGER trg_verifica_nota
BEFORE INSERT ON note
FOR EACH ROW
DECLARE
    id_nou INT := 0;
    nr_studenti INT := 0;
    nr_cursuri INT := 0;
BEGIN

    SELECT nvl(max(id),0) + 1 INTO id_nou FROM note;
    
    SELECT count(*) INTO nr_studenti FROM studenti WHERE id = :new.id_student;
    SELECT count(*) INTO nr_cursuri FROM cursuri WHERE id = :new.id_curs;
    
    IF nr_studenti AND nr_cursuri THEN
        RAISE pachet_exceptii.student_curs_inexistent;
    END IF;

    IF nr_cursuri THEN
        RAISE pachet_exceptii.curs_inexistent;
    END IF; 

    IF nr_studenti THEN
        RAISE pachet_exceptii.student_inexistent;
    END IF;

    IF :new.valoare > 10 OR :new.valoare < 5 THEN
        RAISE pachet_exceptii.nota_invalida;
    END IF;

    :new.id := id_nou;
END;
/


SET SERVEROUTPUT ON;
BEGIN
    INSERT INTO note (id_student, id_curs, valoare) VALUES (10999, 10999, 7);
    INSERT INTO note (id_student, id_curs, valoare) VALUES (10999, 1, 6); -- Student inexistent
    INSERT INTO note (id_student, id_curs, valoare) VALUES (1, 10999, 5); -- Curs inexistent
    INSERT INTO note (id_student, id_curs, valoare) VALUES (1, 1, 10); -- Exemplu valid
EXCEPTION
    WHEN pachet_exceptii.student_curs_inexistent THEN
        DBMS_OUTPUT.PUT_LINE('ERR: Student si curs inexistent');
    WHEN pachet_exceptii.curs_inexistent THEN
        DBMS_OUTPUT.PUT_LINE('ERR: Curs inexistent');
    WHEN pachet_exceptii.student_inexistent THEN
        DBMS_OUTPUT.PUT_LINE('ERR: Student inexistent');
    WHEN pachet_exceptii.nota_invalida THEN
        DBMS_OUTPUT.PUT_LINE('ERR: Nota invalida');
END;
/
