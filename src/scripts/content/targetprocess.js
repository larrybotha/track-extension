/*jslint indent: 2 */
/*global $: false, document: false, togglbutton: false*/
'use strict';

// main entity button
togglbutton.render('div.general-info:not(.toggl)', {observe: true}, function (elem) {
  var link,
    titleElement = $('.i-role-title', elem),
    entityIdElement = $('.entity-id a', elem),
    projectFunc = function () {
      var projectItem =  $('.tau-linkentity');
      return projectItem ? projectItem.textContent : "";
    };
	
	//if element id not found with old tp version, try without the a cause it's just a span in new TP
	if(entityIdElement== undefined || entityIdElement== null){
		entityIdElement = $('.entity-id', elem);
	}
	
	//if element id found continue
	if(entityIdElement!= undefined){
		var entityIdName = entityIdElement.textContent + ' ' + titleElement.textContent;
	  link = togglbutton.createTimerLink({
		className:   'targetprocess',
		description: entityIdName,
		projectName: projectFunc
	  });

	  titleElement.parentElement.appendChild(link);
	}
});

// entity's task buttons
togglbutton.render('.tau-list__table__row:not(.toggl)', {observe: true}, function (elem) {
  var link,
    buttonPlaceholder,
    taskId      = '#' + $('.tau-list__table__cell-id', elem).textContent.trim(),
    taskTitle   = $('.tau-list__table__cell-name', elem).textContent.trim(),
    projectFunc = function () {
      var projectItem =  $('.tau-linkentity');
      return projectItem ? projectItem.textContent : "";
    };

  link = togglbutton.createTimerLink({
    className:   'targetprocess',
    description: taskId + ' ' + taskTitle,
    projectName: projectFunc,
    buttonType:  'minimal'
  });

  buttonPlaceholder = $('.tau-list__table__cell-state', elem);
  buttonPlaceholder.insertBefore(link, buttonPlaceholder.firstChild);
});

// tasks in table view
togglbutton.render('.tau-list-line:not(.toggl)', {observe: true}, function (elem) {
  var link,
    buttonPlaceholder,
	taskIdElement = $('.tau-list-general_entity_id-cell', elem),
	taskTitleElement = $('.tau-list-entity_name_1line-cell', elem),
    projectFunc = function () {
      var projectItem =  $('.tau-list-project_abbr-unit', elem);
      return projectItem ? projectItem.title : "";
    };

	//if element id found continue
	if(taskIdElement!= undefined){
		var taskId      = '#' + $('.tau-list-general_entity_id-cell', elem).textContent.trim();
		var taskTitle = '';
		
		if(taskTitleElement!= undefined){
			taskTitle   = ' ' + $('.tau-list-entity_name_1line-cell', elem).textContent.trim();
		}
		
	  link = togglbutton.createTimerLink({
		className:   'targetprocess',
		description: taskId + taskTitle,
		projectName: projectFunc,
		buttonType:  'minimal'
	  });

	  buttonPlaceholder = $('.tau-board-unit_type_entity-name', elem);
	  buttonPlaceholder.insertBefore(link, buttonPlaceholder.firstChild);
	}
});