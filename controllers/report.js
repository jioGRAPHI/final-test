const db = require(__dirname + '/../db_config/mysql');


exports.addReport = (req, res)=>{
	const { details, category, user_id, restaurant_id } = req.body;
		const ADD_REPORT_QUERY = 'INSERT INTO report (report_details, report_category, reported_by, restaurant_id) VALUES (?, ?, ?, ?)'
		const errors = []
		db.query(ADD_REPORT_QUERY, [details, category, user_id, restaurant_id], (err, results)=>{
			if(!err){
				console.log("Report Submission Successful.");
				return res.json({
					message: 'Report Submission Successful.',
					errors: errors
				});
			}
			else{
				console.log("Error!");
				return res.json({
					message: 'Report Submission Failed',
					errors: errors
				});
			}
		});
}

exports.resolveReport = (req, res)=>{
	console.log('resolving report ---------------')
	const report_id = req.body.report_id
	const resolved_by = req.body.resolved_by;
	console.log(resolved_by)
	const UPDATE_REPORT_QUERY = "UPDATE report SET is_resolved = 1, resolved_by = ? WHERE report_id = ? " 
	db.query(UPDATE_REPORT_QUERY, [resolved_by, report_id], (err, result) => {
		if (!err) {
			console.log("Updated report status from pending to resolved")
			return res.status(200).json({
				message: 'success'
			})
		}
		else{
			return res.status(500).json({
				message: err
			})
		}
	})
}

exports.getReportInfo = (req, res)=>{
	const report_id = req.params.report_id;
	db.query('SELECT * FROM report WHERE report_id = ?', [report_id], (err, results)=>{
		if(!err){
			console.log(results)
			return res.json({
				report_info: results	
			})
		}
		else{
			console.log("error!")
			res.send(err)
		}
	})
}

exports.getReportLists = (req, res)=>{
	console.log('fetching resolved and unresolved reports')
	const GET_UNRESOLVED_REPORTS_QUERY = 'SELECT * FROM report WHERE is_resolved = 0 ORDER BY created_at;'
	const GET_RESOLVED_REPORTS_QUERY = 'SELECT * FROM report WHERE is_resolved = 1 ORDER BY created_at;'
	const GET_CATEGORY_LIST = 'SELECT DISTINCT report_category FROM report ORDER BY report_category;'
	db.query(GET_UNRESOLVED_REPORTS_QUERY, (err, unresolved_reports)=>{
		if(!err){
			db.query(GET_RESOLVED_REPORTS_QUERY, (err, resolved_reports)=>{
				if(!err){
					db.query(GET_CATEGORY_LIST, (err, category_list)=>{
						if(!err){
							console.log('serving report data ..?')
							console.log('report categories:')
							console.log(category_list)
							return res.json({
								unresolved: unresolved_reports,
								resolved: resolved_reports,
								categories: category_list
							})
						}
					})
				}
			})
		}
		else{
			console.log("ERROR encountered while fetching unresolved reports")
			return res.json({
				error: 'failed'
			})
		}
	})
}
