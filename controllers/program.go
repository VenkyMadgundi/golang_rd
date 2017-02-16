package controllers

import (
	"github.com/astaxie/beego"
	"database/sql"
	//"encoding/json"
	_ "github.com/go-sql-driver/mysql"
)

// ProgramController operations for Program
type ProgramController struct {
	beego.Controller
}

// URLMapping ...
func (c *ProgramController) URLMapping() {
	c.Mapping("Post", c.Post)
	c.Mapping("GetOne", c.GetOne)
	c.Mapping("GetAll", c.GetAll)
	c.Mapping("Put", c.Put)
	c.Mapping("Delete", c.Delete)
}

// Post ...
// @Title Create
// @Description create Program
// @Param	body		body 	models.Program	true		"body for Program content"
// @Success 201 {object} models.Program
// @Failure 403 body is empty
// @router / [post]
func (c *ProgramController) Post() {

}

// GetOne ...
// @Title GetOne
// @Description get Program by id
// @Param	id		path 	string	true		"The key for staticblock"
// @Success 200 {object} models.Program
// @Failure 403 :id is empty
// @router /:id [get]
func (c *ProgramController) GetOne() {

}

// GetAll ...
// @Title GetAll
// @Description get Program
// @Param	query	query	string	false	"Filter. e.g. col1:v1,col2:v2 ..."
// @Param	fields	query	string	false	"Fields returned. e.g. col1,col2 ..."
// @Param	sortby	query	string	false	"Sorted-by fields. e.g. col1,col2 ..."
// @Param	order	query	string	false	"Order corresponding to each sortby field, if single value, apply to all sortby fields. e.g. desc,asc ..."
// @Param	limit	query	string	false	"Limit the size of result set. Must be an integer"
// @Param	offset	query	string	false	"Start position of result set. Must be an integer"
// @Success 200 {object} models.Program
// @Failure 403
// @router / [get]
func (c *ProgramController) GetAll() {

}

// Put ...
// @Title Put
// @Description update the Program
// @Param	id		path 	string	true		"The id you want to update"
// @Param	body		body 	models.Program	true		"body for Program content"
// @Success 200 {object} models.Program
// @Failure 403 :id is not int
// @router /:id [put]
func (c *ProgramController) Put() {

}

// Delete ...
// @Title Delete
// @Description delete the Program
// @Param	id		path 	string	true		"The id you want to delete"
// @Success 200 {string} delete success!
// @Failure 403 id is empty
// @router /:id [delete]
func (c *ProgramController) Delete() {

}

func (c *ProgramController) LoadDashboard() {
	c.Data["Website"] = "WGS Openbar"
	c.Data["Email"] = "vyankatesh.madgundi@synechron.com"
	c.Data["Result"] = false

	db, err := sql.Open("mysql", "root:root@/wgs_test")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()
	/*selected_id = params[:selected_id]
  selected_type = params[:selected_type].present? ? params[:selected_type] : "Market"
  if selected_id.present?
    market_with_type = selected_type.constantize.find(selected_id)
    market_ids =  [market_with_type, market_with_type.user_assigned_markets]
    market_ids.flatten!
    @market = market_ids
  else
    @market = market_ids = current_user.markets
  end*/
  all_programs, _ := db.Query("SELECT program_name, program_id, IF(goals IS NULL, 'NA', goals) as goals, IF(executed IS NULL, 0, executed) as executed, scheduled, IF(goals IS NULL, 'NA', (goals - (executed + scheduled)) ) as remaining FROM (SELECT programs.name as program_name, programs.id as program_id, (SELECT SUM(program_goal_counts.count) FROM program_goal_counts INNER JOIN program_goals ON program_goals.id = program_goal_counts.program_goal_id WHERE program_goal_counts.status = 'activated' AND (program_id = programs.id AND program_goalable_id = 1 AND program_goalable_type = 'SystemMetric') ) as goals, (SELECT SUM(allocation) FROM events WHERE (start_at != '' and end_at != '' and events.active = true) AND (allocation > 0 AND program_id = programs.id AND events.end_at <= now())) as executed, (SELECT COUNT(*) FROM events WHERE (start_at != '' and end_at != '' AND events.active = true) AND (allocation > 0 AND program_id = programs.id AND events.end_at > now() )) AS scheduled FROM programs WHERE created_year = year(now()) AND active = true ORDER BY program_name) AS sub_query WHERE (goals IS NOT NULL OR executed IS NOT NULL) ORDER BY program_name")
  c.Data["Programs"] = getData(all_programs)
	c.TplName = "show_program.tpl"
}

func (c *ProgramController) LoadGVA() {
	c.Data["Website"] = "WGS Openbar"
	c.Data["Email"] = "vyankatesh.madgundi@synechron.com"
	c.Data["Result"] = false

	db, err := sql.Open("mysql", "root:root@/wgs_test")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()
	/*selected_id = params[:selected_id]
    selected_type = params[:selected_type].present? ? params[:selected_type] : "Market"
    if selected_id.present?
      market_with_type = selected_type.constantize.find(selected_id)
      @market =  [market_with_type, market_with_type.user_assigned_markets]
      @market.flatten!
    end    
    respond_to do |format|
      format.js{render :partial =>'pages/program_selected_gva', :locals => {:program => resource}}
    end  */
  all_programs, _ := db.Query("SELECT program_name, program_id, IF(goals IS NULL, 'NA', goals) as goals, IF(executed IS NULL, 0, executed) as executed, scheduled, IF(goals IS NULL, 'NA', (goals - (executed + scheduled)) ) as remaining FROM (SELECT programs.name as program_name, programs.id as program_id, (SELECT SUM(program_goal_counts.count) FROM program_goal_counts INNER JOIN program_goals ON program_goals.id = program_goal_counts.program_goal_id WHERE program_goal_counts.status = 'activated' AND (program_id = programs.id AND program_goalable_id = 1 AND program_goalable_type = 'SystemMetric') ) as goals, (SELECT SUM(allocation) FROM events WHERE (start_at != '' and end_at != '' and events.active = true) AND (allocation > 0 AND program_id = programs.id AND events.end_at <= now())) as executed, (SELECT COUNT(*) FROM events WHERE (start_at != '' and end_at != '' AND events.active = true) AND (allocation > 0 AND program_id = programs.id AND events.end_at > now() )) AS scheduled FROM programs WHERE created_year = year(now()) AND active = true ORDER BY 1) AS sub_query WHERE (goals IS NOT NULL OR executed IS NOT NULL)")


  //Allocation
  //SELECT SUM(`program_goal_counts`.`count`) AS sum_id FROM `program_goal_counts` INNER JOIN `program_goals` ON `program_goals`.`id` = `program_goal_counts`.`program_goal_id` WHERE `program_goal_counts`.`status` = 'activated' AND (program_id =436 AND program_goalable_id = 1 AND program_goalable_type = 'SystemMetric');
  
  //SELECT COUNT(*) FROM `events` WHERE (start_at != '' and end_at != '' and events.active = true) AND (allocation > 0 AND program_id IN (436) AND events.end_at <= '2016-11-27 12:46:56' )

  //Consumer Sampled
  //SELECT sum(events.consumer_sampled) FROM `events` WHERE (start_at != '' and end_at != '' and events.active = true) AND (allocation > 0 AND program_id IN (436) AND events.end_at <= now() )

  //Consumerb influenced
  //SELECT sum(events.consumer_influenced) FROM `events` WHERE (start_at != '' and end_at != '' and events.active = true) AND (allocation > 0 AND program_id IN (436) AND events.end_at <= now() )

  //Total Spend
  //SELECT sum(events.consumer_influenced) FROM `events` WHERE (start_at != '' and end_at != '' and events.active = true) AND (allocation > 0 AND program_id IN (436) AND events.end_at <= now() )


  c.Data["Programs"] = getData(all_programs)
	c.TplName = "show_program.tpl"
}



func (c *ProgramController) LoadSupportedAccount() {
	c.Data["Website"] = "WGS Openbar"
	c.Data["Email"] = "vyankatesh.madgundi@synechron.com"
	c.Data["Result"] = false

	db, err := sql.Open("mysql", "root:root@/wgs_test")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()
  supported_accounts, _ := db.Query("SELECT sum(spend) as ts_sum, accounts.id as account_id, (CASE accounts.market_type WHEN 'Division' THEN (SELECT name FROM divisions WHERE id = accounts.market_id) WHEN 'State' THEN (SELECT name FROM states WHERE id = accounts.market_id) WHEN 'Region' THEN (SELECT name FROM regions WHERE id = accounts.market_id) WHEN 'Neighborhood' THEN (SELECT name FROM neighborhoods WHERE id = accounts.market_id) ELSE (SELECT name FROM markets WHERE id = accounts.market_id) END) AS market_name, accounts.name as account_name, (CASE accounts.market_type WHEN 'Division' THEN (SELECT name FROM divisions WHERE id = accounts.market_id) WHEN 'State' THEN (SELECT name FROM states WHERE id = accounts.market_id) WHEN 'Region' THEN (SELECT name FROM regions WHERE id = accounts.market_id) WHEN 'Neighborhood' THEN (SELECT name FROM neighborhoods WHERE id = accounts.market_id) ELSE (SELECT name FROM markets WHERE id = accounts.market_id) END) as market_name, (SELECT count(menu_placements.id) FROM menu_placements WHERE menu_placements.account_id = accounts.id AND (start_date != '' AND created_year IN (2016))) as mp, (SELECT count(wait_staff_trainings.id) FROM wait_staff_trainings WHERE wait_staff_trainings.account_id = accounts.id AND (date != '') and created_year in (2016)) as wst, ((SELECT count(events.id) FROM events WHERE events.account_id = accounts.id AND (start_at != '' and end_at != '' AND events.active = true) AND created_year in (2016)) + (SELECT count(tactical_spends.id) FROM tactical_spends WHERE tactical_spends.account_id = accounts.id and created_year in (2016)) ) as ev, (SUM(expenses.spend) + (SELECT IFNULL(sum(tactical_spends.total_spend), 0) FROM tactical_spends WHERE tactical_spends.account_id = accounts.id AND created_year in (2016))) as sum_ta FROM `expenses` INNER JOIN `events` ON `events`.`id` = `expenses`.`event_id` INNER JOIN `accounts` ON `accounts`.`id` = `events`.`account_id` WHERE (expenses.status != 'Deleted' AND expenses.status != 'ApprovedRejected' ) AND (status = 'Approved' AND expense_type = 'Bar Spend' AND created_year in (2016)) GROUP BY accounts.id HAVING sum(expenses.spend) > 0 ORDER BY sum_ta desc, ev desc, mp desc, wst desc")
  c.Data["SupportedAccount"] = getData(supported_accounts)
	c.TplName = "show_supported_account.tpl"
}