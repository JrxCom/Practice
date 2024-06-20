/* 引入数据库连接 */
const db = require('../../db/db')

/* 获取数据列表 */
exports.getDataList = (req, res) => {
    const page = (req.body['page'] - 1) * req.body['max']
    const max = req.body['max']
    if (req.cookies.cookieCode === undefined) return res.send({ status: 403, message: "登录失效，请重新登录！" })
    const get_database = new Promise((resolve) => {
        db.query(`SELECT * FROM learner.web WHERE id = ${req.query.wid}`, (err, results) => {
            
            resolve(results[0]['database'])
        })
    });

    const get_table = new Promise((resolve) => {
        db.query(`SELECT * FROM learner.table WHERE id = ${req.query.tid}`, (err, results) => {
            
            resolve(results[0]['table'])
        })
    });


    Promise.all([get_database, get_table]).then((promiseRes) => {
        db.query(`SELECT COUNT(*) FROM ${promiseRes[0]}.${promiseRes[1]}`, (err, results) => {
            console.log(err);
            const count = results[0]['COUNT(*)']
            db.query(`SELECT * FROM ${promiseRes[0]}.${promiseRes[1]} ORDER BY creatime ASC LIMIT ${page},${max}`, (err, results) => {
                if (results) res.send({ status: 200, obj: { records: results, count } })
                if (err) res.send({ status: 500, message: "获取数据列表失败！" })
            })
        })
    })
}

/* 根据id搜索数据 */
exports.getDataSearch = (req, res) => {
    if (req.cookies.cookieCode === undefined) return res.send({ status: 403, message: "登录失效，请重新登录！" })
    const get_database = new Promise((resolve) => {
        db.query(`SELECT * FROM learner.web WHERE id = ${req.query.wid}`, (err, results) => {
            resolve(results[0]['database'])
        })
    });

    const get_table = new Promise((resolve) => {
        db.query(`SELECT * FROM learner.table WHERE id = ${req.query.tid}`, (err, results) => {
            resolve(results[0]['table'])
        })
    });


    Promise.all([get_database, get_table]).then((promiseRes) => {
        db.query(`SELECT * FROM ${promiseRes[0]}.${promiseRes[1]} where id = ${req.query.id}`, (err, results) => {
            if (results) res.send({ status: 200, obj: { records: results } })
            if (err) res.send({ status: 500, message: "获取数据列表失败！" })
        })
    })
}

/* 添加数据信息 */
exports.addDataInfo = (req, res) => {
    if (req.cookies.cookieCode === undefined) return res.send({ status: 403, message: "登录失效，请重新登录！" })
    const data = req.body
    data['id'] = new Date().getTime()
    data['creatime'] = new Date()

    const get_database = new Promise((resolve) => {
        db.query(`SELECT * FROM learner.web WHERE id = ${req.query.wid}`, (err, results) => {
            resolve(results[0]['database'])
        })
    });

    const get_table = new Promise((resolve) => {
        db.query(`SELECT * FROM learner.table WHERE id = ${req.query.tid}`, (err, results) => {
            resolve(results[0]['table'])
        })
    });

    Promise.all([get_database, get_table]).then((promiseRes) => {
        db.query(`INSERT INTO ${promiseRes[0]}.${promiseRes[1]} SET ?`, data, (err, results) => {
            if (results) res.send({ status: 200, message: "添加数据成功。" })
            if (err) res.send({ status: 500, message: "添加数据失败！" })
        })
    }).catch(err => {
        res.send({ status: 500, message: err })
    })

}

/* 获取数据信息 */
exports.getDataInfo = (req, res) => {
    if (req.cookies.cookieCode === undefined) return res.send({ status: 403, message: "登录失效，请重新登录！" })
    const get_database = new Promise((resolve) => {
        db.query(`SELECT * FROM learner.web WHERE id = ${req.query.wid}`, (err, results) => {
            resolve(results[0]['database'])
        })
    });

    const get_table = new Promise((resolve) => {
        db.query(`SELECT * FROM learner.table WHERE id = ${req.query.tid}`, (err, results) => {
            resolve(results[0]['table'])
        })
    });

    Promise.all([get_database, get_table]).then((promiseRes) => {
        db.query(`SELECT * FROM ${promiseRes[0]}.${promiseRes[1]}  WHERE id = ${req.query.id}`, (err, results) => {
            if (results) res.send({ status: 200, obj: results[0] })
            if (err) res.send({ status: 500, message: "获取数据信息失败！" })
        })
    })
}

/* 获取关联数据信息 */
exports.getSelectData = (req,res) =>{
    if (req.cookies.cookieCode === undefined) return res.send({ status: 403, message: "登录失效，请重新登录！" })
        const get_database = new Promise((resolve) => {
            db.query(`SELECT * FROM learner.web WHERE id = ${req.query.wid}`, (err, results) => {
                resolve(results[0]['database'])
            })
        });
    
        const get_table = new Promise((resolve) => {
            db.query(`SELECT * FROM learner.table WHERE id = ${req.query.tid}`, (err, results) => {
                resolve(results[0]['table'])
            })
        });

        const get_field = new Promise((resolve) => {
            db.query(`SELECT * FROM learner.field WHERE id = ${req.query.fid}`, (err, results) => {
                resolve(results[0]['field'])
            })
        });

        Promise.all([get_database, get_table,get_field]).then((promiseRes) => {
            db.query(`SELECT ${promiseRes[2]} FROM ${promiseRes[0]}.${promiseRes[1]}`, (err, results) => {
                let value = []
                results.forEach(item => {
                    value.push(item.name)
                });
                if (results) res.send({ status: 200,  obj: { records: value } })
                if (err) res.send({ status: 500, message: "获取关联数据信息失败！" })
            })
        }).catch(err => {
            res.send({ status: 500, message: err })
        })


}

/* 修改数据信息 */
exports.editDataInfo = (req, res) => {
    if (req.cookies.cookieCode === undefined) return res.send({ status: 403, message: "登录失效，请重新登录！" })
    const data = req.body

    const get_database = new Promise((resolve) => {
        db.query(`SELECT * FROM learner.web WHERE id = ${req.query.wid}`, (err, results) => {
            resolve(results[0]['database'])
        })
    });

    const get_table = new Promise((resolve) => {
        db.query(`SELECT * FROM learner.table WHERE id = ${req.query.tid}`, (err, results) => {
            resolve(results[0]['table'])
        })
    });

    Promise.all([get_database, get_table]).then((promiseRes) => {
        db.query(`UPDATE ${promiseRes[0]}.${promiseRes[1]} SET ? WHERE id = ${req.query.id}`, data, (err, results) => {
            if (results) res.send({ status: 200, message: "修改数据信息成功。" })
            if (err) res.send({ status: 500, message: "修改数据信息失败！" })
        })
    }).catch(err => {
        res.send({ status: 500, message: err })
    })
}

/* 删除数据信息 */
exports.removeDataInfo = (req, res) => {
    if (req.cookies.cookieCode === undefined) return res.send({ status: 403, message: "登录失效，请重新登录！" })
    const get_database = new Promise((resolve) => {
        db.query(`SELECT * FROM learner.web WHERE id = ${req.query.wid}`, (err, results) => {
            resolve(results[0]['database'])
        })
    });

    const get_table = new Promise((resolve) => {
        db.query(`SELECT * FROM learner.table WHERE id = ${req.query.tid}`, (err, results) => {
            resolve(results[0]['table'])
        })
    });

    Promise.all([get_database, get_table]).then((promiseRes) => {
        db.query(`DELETE FROM ${promiseRes[0]}.${promiseRes[1]} WHERE id in (${req.body['ids[]']})`, (err, results) => {
            if (results) res.send({ status: 200, message: "删除数据信息成功。" })
            if (err) res.send({ status: 500, message: "删除数据信息失败！" })
        })
    }).catch(err => {
        res.send({ status: 500, message: err })
    })
}

