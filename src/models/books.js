class Books {
    constructor(pool) {
        this.pool = pool;
    }

    async getAllBooks () {
        try {
            const results = await this.pool.query(`
            select * from books
            order by id asc`);

            return results.rows;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async addBook(book) {
        try {
            const queryResult = await this.pool.query(`
                INSERT INTO books (
                    id, author, title, poster, description, pagecount, categories, publish_date
                ) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING id;
            `, [
                book.id, book.author, book.title, book.poster, book.description, book.pagecount, book.categories, book.publish_date
            ]);
    
            return 'book', queryResult.rows[0].id, 'added';
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    // async createTemplate(id_1c, complectId, teacher, year, discipline, userName) {
    //     try {
    //     //   const searchResult = await this.pool.query(`
    //     //   SELECT * FROM rpd_profile_templates
    //     //   WHERE disciplins_name = $1 AND year = $2
    //     // `, [discipline, year]);
    
    //     //   if (searchResult.rowCount > 0) return "record exists";
    //       const templateData = await this.pool.query(`
    //         SELECT * FROM rpd_1c_exchange
    //         WHERE id = $1`, [id_1c]
    //       );
    
    //       const resultData = templateData.rows[0];
    //       const competencies = resultData.results.reduce((acc, current, index) => {
    //         acc[index] = {
    //           results: "",
    //           indicator: "",
    //           competence: current
    //         };
    //         return acc;
    //       }, {});
    
    //       const queryResult = await this.pool.query(`
    //         INSERT INTO rpd_profile_templates (
    //           id_rpd_complect,
    //           disciplins_name, 
    //           department, 
    //           teacher,
    //           place,
    //           semester,
    //           competencies, 
    //           zet,
    //           study_load
    //         ) VALUES (
    //           $1, $2, $3, $4, $5, $6, $7, $8, $9
    //         ) RETURNING id`,
    //         [
    //           complectId,
    //           discipline,
    //           resultData.department,
    //           teacher,
    //           resultData.place,
    //           resultData.semester,
    //           competencies,
    //           resultData.zet,
    //           JSON.stringify(resultData.study_load)
    //         ]);
    
    //       await this.pool.query(`
    //           UPDATE rpd_1c_exchange
    //           SET teacher = $1
    //           WHERE id = $2`,
    //         [teacher, id_1c]);
    
    //       const idProfileTemplate = queryResult.rows[0].id;
    //       const status = {
    //         date: moment().format(),
    //         status: "Создан",
    //         user: userName
    //       }
    
    //       await this.pool.query(`
    //           UPDATE template_status
    //           SET history = history || $1::jsonb,
    //           id_profile_template = $2
    //           WHERE id_1c_template = $3`,
    //         [status, idProfileTemplate, id_1c])
    
    //       return "template created";
    //     } catch (error) {
    //       console.log(error);
    //       throw error
    //     }
    //   }
}

module.exports = Books;