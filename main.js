document.getElementById('issueInputForm').addEventListener('submit', saveIssue);
document.getElementById('issueInputForm').addEventListener('reset', showHideJumbotron);

function fetchIssues(status = 'all'){
    var issues = [];
    if (status == 'all') {
        issues = JSON.parse(localStorage.getItem('issues'));
    } else {
        issues = JSON.parse(localStorage.getItem('issues'))
        if (issues.length > 0){
            issues = issues.filter((i) => i.status === status);
        }
    }
    
    var issuesList = document.getElementById('issuesList');
    if (typeof issues != "undefined"  
                        && issues != null  
                        && issues.length != null  
                        && issues.length > 0) {        
        issuesList.innerHTML = '';
        for (var i = 0; i < issues.length; i++){
            var id = issues[i].id;
            var title = issues[i].title;
            var desc = issues[i].description;
            var severity = issues[i].severity;
            var assignedTo = issues[i].assignedTo;
            var status = issues[i].status;
    
            issuesList.innerHTML += '<div class="well">' +
                                        '<p><a href="#" onclick="openIssue(\''+id+'\')" class="label label-info">' + status + '</a></p>'+
                                        '<h3>' + title + '</h3>'+
                                        '<h5>' + desc + '</h5>' +
                                        '<p><span class="glyphicon glyphicon-time"></span> ' + severity + ' '+
                                        '<span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
                                        '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a> '+
                                        '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>'+
                                        '<h6>Issue ID: ' + id + '</h6>'
                                    '</div>';
        }
    } else {
		issuesList.innerHTML = '<p>No issues to show</p>'
	}
}

function saveIssue(e){
    var issueId = chance.guid();
    var issueTitle = document.getElementById('issueTitleInput').value;
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var issueStatus = 'Open';

    var issue = {
        id: issueId,
        title: issueTitle,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    if (localStorage.getItem('issues') === null){
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById('issueInputForm').reset();
    document.getElementById('addIssue').style.display = "none";
    document.getElementById('addButton').innerHTML = "Add New Issue";

    fetchIssues();

    e.preventDefault();
}

function setStatusClosed (id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    
    for(var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues[i].status = "Closed";
        }
    }
      
    localStorage.setItem('issues', JSON.stringify(issues));
    
    fetchIssues();
  }

  function openIssue (id){
      var issues = JSON.parse(localStorage.getItem('issues'));

      for (var i = 0;i < issues.length; i++){
          if (issues[i].status = 'Closed'){
              issues[i].status = 'Open';
          }
      }

      localStorage.setItem('issues', JSON.stringify(issues));

      fetchIssues();
  }

  function deleteIssue (id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    
    for(var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues.splice(i, 1);
        }
    }
    
    localStorage.setItem('issues', JSON.stringify(issues));
    
    fetchIssues();
  }

  function showHideJumbotron(){
    var addIssue = document.getElementById("addIssue");
    var closeAddIssue = document.getElementById("addButton");

    if (addIssue.style.display === "none") {
      addIssue.style.display = "block";
      closeAddIssue.innerHTML = "Hide New Issue";
    } else {
      addIssue.style.display = "none";
      closeAddIssue.innerHTML = "Add New Issue";
    }
  }
