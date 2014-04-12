





exports = module.exports = {
		getJsonEditor: getJsonEditor
};


function JsonEditor()
{
var version = "1.0";	
var name = "JsonEditor";


}
function replaceAll(string, token, newtoken) {
    if(token!=newtoken)
    while(string.indexOf(token) > -1) {
        string = string.replace(token, newtoken);
    }
    return string;
}

function getJsonEditor(fieldName, fieldCls, fieldValue)
{
var editor = '<div id="field-chooser"'
+ ' class="fieldEditor ' + (fieldCls ? fieldCls : "") + '">'
+ '<div id = "add-field-form">'
+ '<select id="fieldSelectBox" name="fieldSelectBox">'
 + '<option value="text">text</option>'
 + '<option value="textarea">textarea</option>'
+ '<option value="radios">radios</option>'
+ '<option value="checkboxes">checkboxes</option>'
+ '<option value="select">select</option>'
+ '<option value="radio">radio</option>'
+ '<option value="checkbox">checkbox</option>'
+ '<option value="hidden">hidden</option>'
+ '<option value="password">password</option>'
+ '<option value="email">email</option>'
+ '<option value="url">url</option>'
+ '<option value="file">file</option>'
+ '<option value="image">image</option>'
+ '<option value="link">link</option>'
+ '<option value="readonlytext">readonlytext</option>'
+ '<option value="date">date</option>'
+ '<option value="time"> time</option>'
+ '<option value="datetime"> datetime</option>'
+ '<option value="crontime">crontime</option>'
+ '<option value="richtext">richtext</option>'
+ '<option value="address">address</option>'
 + '</select>'
 + '<table style="width:50%;">'
 + '<tr><td>Name</td><td><input type="text" id="name"></input></td></tr>'
 + '<tr><td>Label</td><td><input type="text" id="label"></input></td></tr>'
 + '<tr><td>Description</td><td><textarea  id="description" class="textarea"></textarea></td></tr>'
 + '<tr><td>Placeholder</td><td><input type="text" id="placeholder"></input></td></tr>'
 + '<tr><td>Required</td><td><input type="checkbox" id="required"></check></td></tr>'
 + '<tr><td>Default</td><td><input type="text" id="default"></input></td></tr>'
 + '<tr><td><div id="optionslabel">Options</div></td><td><textarea  id="options" class="textarea"></textarea></td></tr>'
 + '</table>'
 + '<h3>(' + (fieldValue ? fieldValue : "") + ')</h3>'
 + '<input type="button" onclick="addField(\'' + fieldName + '\');" value="Add Field"/><input type="hidden" id="sectionNum" value="0" />'
 +'</div>'
 +'<div id="add-section-panel"><a id="add-section-link" href="javascript:void(0);" onclick="showSectionForm();">Add New Section</a>'
 +'<div id="add-section-form"><input type="text" id="section-name"></input>'
 + '<input type="button" value="Add Section" onclick="hideSectionForm();" />'
 +'</div>'
 +'</div>'
+ '<div id="fieldDisplayer"></div>'
	+ '<input type=\'hidden\' '
  + ' name=\'' + fieldName + '\''
  + ' id=\'' + fieldName + '\''
  + 'value=\'' +  (fieldValue ? fieldValue : "") +'\' /><div id="' 
  + 'display-json" style="font-weight:bold;">'
  + (fieldValue ? fieldValue : "")
  + '</div></div><script>';

if ((fieldValue != null) && (fieldValue.length > 0))
{
var replaced = replaceAll(fieldValue,'"','\'');


editor += 'var FormPart = JSON.parse(\'' + fieldValue + '\');';
editor += 'setValue(JSON.stringify(FormPart));'
}else{
	editor +='var FormPart = new FormPartial();';
	
 
}
 
 editor +=  getFormPartial()
 + getFieldModel()
 + getClearFunction()
  + getMakeList()
  + AddSectionForm()
  + HideSectionForm()
  + getSectionModel()
  + addNewSection()
  + showAddFieldForm()
  + getAddField()
    + getTableRow()
    + setHiddenField(fieldName)
     + getHiddenField(fieldName)
      + getAddField()
  + '</script>';	

return editor;
}

function AddSectionForm()
{
var addsection = 'function showSectionForm()'
	+ '{'
	+'$("#add-section-form").show();'
	+'$("#add-section-link").hide();'
	+ '}';

return addsection;
}
function HideSectionForm()
{
var addsection = 'function hideSectionForm()'
	+ '{'
	+'addSection($("#section-name").val());'
	+'$("#section-name").val("");'
	+'$("#add-section-form").hide();'
	+'$("#add-section-link").show();'
	+ '}';

return addsection;
}
function getSectionModel()
{
var section = 'function section(label)'
	+'{'
	+'this.label = label;'
	+'this.fields = [];'
	+'}'
	+'section.prototype.label = "";'
	+'section.prototype.fields = [];';

return section;

}
function getFormPartial()
{
var part = 'function FormPartial()'
	+ '{'
	+ 'this.sections=[];'
	+ '};'
	+ 'FormPartial.prototype.sections = [];';


return part;

}
function showAddFieldForm()
{
	var show = 'function showAddFieldForm(section)'
		+'{'
		+'$("#sectionNum").val(section);'
		+'$("#add-field-form").show();'
		+'}';
return show;

}
function addNewSection()
{
var newsection = 'function addSection(label)'
	+'{'
	+'var section1 = new section(label);'
	+'FormPart.sections.push(section1);'
	+'setValue(JSON.stringify(FormPart));makeFieldList();$("#display-json").html(JSON.stringify(FormPart));'
	+'}';


return newsection;

}
function getFieldModel()
{
var model = 'function Field(fieldtype,flabel,fname,fdescription,fplaceholder,frequired,fdefaultValue,foptions) {'
	   + 'this.type = fieldtype;'
	   + 'this.label = flabel;'
	   + 'this.name = fname;'
	   + 'this.description = fdescription;'
	   + 'if (fplaceholder.length > 0) {'
	   + 'this.placeholder = fplaceholder;'
	   + '}'
	   + 'this.required = frequired;'
	   + 'if (fdefaultValue.length > 0) {'
	   + 'this.defaultValue = fdefaultValue;'
	 	+ '}'
	   + 'if (foptions.length > 0){'
	   + 'this.options = foptions;'
	   + '}'
	  + '}'
	 + 'Field.prototype.type = "text";'
	 + 'Field.prototype.label = "";'
	 + 'Field.prototype.name = "";'
	 + 'Field.prototype.description = "";'
	 + 'Field.prototype.placeholder = "";'
	 + 'Field.prototype.required = false;'
	 + 'Field.prototype.defaultValue = "";'
	 + 'Field.prototype.options = "";';	



return model;

}
function getAddField()
{
   var addField = 'function addField(fieldname)'
  + '{var sectionNum = $("#sectionNum").val();var field1 = new Field($("#fieldSelectBox :selected").val(),$("#label").val(),$("#name").val(),$("#description").val(),$("#placeholder").val(),$("#required").prop("checked"),$("#default").val(),$("#options").val());'
  + '$.each(FormPart.sections, function( index, value ){'
  + 'if (index==sectionNum){'
  +'value.fields.push(field1);clearFields();makeFieldList();setValue(JSON.stringify(FormPart));$("#display-json").html(JSON.stringify(FormPart));$("#add-field-form").hide();'
 + '}'
  + '});'
  + '}';
 return addField;
}
function setHiddenField(fieldname)
{
	var setfield = 'function setValue(value){'
		+ 'var s = document.getElementById("' + fieldname + '");'
		+ 's.value = value;'
+ '}';
	return setfield;
}

function getHiddenField(fieldname)
{
	var setfield = 'function getValue(){'
		+ 'var s = document.getElementById("' + fieldname + '");'
		+ 'return s.value;'
+ '}';
	return setfield;
}
function getMakeList()
{
	var make = 'function makeFieldList()'
		+ '{'
		 + '$("#fieldDisplayer").html("");'
		+'var sectioncnt = 0;'
		+'var display = $("#fieldDisplayer");'
		+ '$.each(FormPart.sections, function( index, value ){'
		+ '$("#fieldDisplayer").append("<h2>" + value.label + "</h2>");'
		+'var tablename = "tablefields" + sectioncnt;'
		+ '$("#fieldDisplayer").append("<table id = \'" + tablename + "\' class=\'sortable\'></table>");'
		+ '$("#" + tablename).append("<thead>");'
		+ '$("#" + tablename).append(getTableRow("Type", "Name", "Label", "Description", "Placeholder", "Required", "Default", "Options", false));'
		+ '$("#" + tablename).append("</thead>");'
		+ '$("#" + tablename).append("<tbody>");'
		+ '$.each(value.fields, function( index, value ){'
		+ 'var req = "false";'
		+ 'if (typeof value.required === \'undefined\'){}else'
		+ '{req = value.required.toString();}'
		+ '$("#" + tablename).append(getTableRow(value.type, value.name, value.label, value.description, value.placeholder, req, value.defaultValue, value.options, false));'
		+ '});'
		+ '$("#" + tablename).append("</tbody>");'
		+ '$("#fieldDisplayer").append("<a href=\'javascript:void(0);\' onclick=\'showAddFieldForm(" + sectioncnt + ")\'>Add Field</a>");'
		+ 'sectioncnt++;'
		+ onDrop()
    	+ '});'
		+'}';
	 return make;
}
function getProperlyFormatted()
{
	var properJson = 'function getProperJson()'
		+ '{'
	+ 'var stringd = "[";'
	+ 'var gotone = false;'
	+ '$.each(fields, function( index, value ){'
	+ 'if (gotone)'
	+ '{'
	+'stringd += ",";'
	+ '}'
	+'stringd += getJsonRow(value);'
	+ 'gotone = true;'
	+ '});'
	+ 'stringd +="]";'
	+ 'return stringd;'
		+ '}';

return properJson;
}
function getJsonRow()
{
	var row = 'function getJsonRow(value)'
+'{'
+'var row = "{"'
+'+ "type:" + "\'" + value.type + "\'"'
+'+ ",name:\'" + value.name + "\'"'
+'+ ",label:\'" + value.label + "\'"'
+'+ ",description:\'" + value.description + "\'"'
+'+ ",placeholder:\'" + value.placeholder + "\'"'
+'+ ",required:\" + value.required.toString() + "\"'
+'+ ",defaultValue:\'" + value.defaultValue + "\'";'
+' if((typeof(value.options) == "undefined" )|| (value.options == null)){'
+'}else{'
+'row += ",options:\'" + value.options + "\'";'
+'}'
+'row += "}";'
	+'return row;'
+'}';

return row;
}

function onDrop()
{
var drop = '  $("#" + tablename).tableDnD({'
	+'   onDrop: function(table, row) {'
	+'        var rows = table.tBodies[0].rows;'
	+' var debugStr = "Row dropped was " + row.id + ". New order: ";'
	+'var jsonStr = \'{\';'	
	+' jsonStr += \'\"sections\":[\';'
	+ '$.each(FormPart.sections, function( index, value ){'
	+'var cntr = 0;'
	+ 'if (index > 0)'
	+' {jsonStr += \',\';}'
	+' jsonStr += \'{\"label\":\"\' + value.label + \'",\"fields\":[\';'
	+' $("#tablefields" + index + " > tbody > tr").each(function() {'
	+' var $this = $(this);'
	+' var my_td = $this.children("td");'
	+' if (cntr > 0) {'
	+' if (cntr > 1) {'
	+' jsonStr += \',\';'
	+' }'
	+' jsonStr += \'{\';'
	+' jsonStr += \'\"type\":\"\' +  my_td.eq(0).html() + \'\"\';'
	+' jsonStr += \',\"name\":\"\' +  my_td.eq(1).html() + \'\"\';'
	+' jsonStr += \',\"label\":\"\' +  my_td.eq(2).html() + \'\"\';'
	+' jsonStr += \',\"description\":\"\' +  my_td.eq(3).html() + \'\"\';'
	+'  if ((my_td.eq(4).html() != \'undefined\') & (my_td.eq(4).length != 0))'
	+' jsonStr += \',\"placeholder\":\"\' +  my_td.eq(4).html() + \'\"\';'
	+' jsonStr += \',\"required\":\' +  my_td.eq(5).html();'
	+'  if ((my_td.eq(6).html() != \'undefined\') & (my_td.eq(6).length != 0))'
	+' jsonStr += \',\"defaultValue\":\"\' +  my_td.eq(6).html() + \'\"\';'
	+'  if ((my_td.eq(7).html() != \'undefined\') & (my_td.eq(7).length != 0))'
	+' jsonStr += \',\"options\":\"\' +  my_td.eq(7).html() + \'\"\';'
	+' jsonStr += \'}\';'
	+' }'
	+' cntr++;'
	+' });'
	+' jsonStr += \']\';'
	+' jsonStr += \'}\';'
	+'    });'
	+' jsonStr += \']}\';'
	+' setValue(jsonStr);FormPart = JSON.parse(jsonStr);$("#display-json").html(JSON.stringify(FormPart));'
	+'    }'
	+  '});';

return drop;

}
function getTableRow()
{
	var row = 'function getTableRow(fieldtype, fieldname, fieldlabel, decr, place, req, def, opts, isHeader)'
+'{'
+'var opener = "<td data-col=\'" + fieldname + "\'>";'
+'var closer = "</td>";'
+'if (isHeader){'
+ 'opener = "<th>";'
+ 'closer = "</th>";'
+'}'
+'var op = "";'
+ 'if (opts != "Undefined") op = opts;'
+ 'if (def == \'Undefined\') def = "";'
+'var trow = "<tr id=\'r" + fieldname + "\'>"'
+' + opener + fieldname + closer'
+' + opener + fieldtype + closer'
+' + opener + fieldlabel + closer'
+' + opener + decr + closer'
+' + opener + place + closer'
+' + opener + req.toString() + closer'
+' + opener + def + closer'
+' + opener + op + closer'
+' + "</tr>";'
+'return trow;'
+'}';

	return row;
}
function getClearFunction()
{
var clear ='function clearFields()'
	+ '{'
	+ '$("#fieldSelectBox option[value=text]").attr("selected", true);'
	+ '$("#label").val("");'
	+ '$("#name").val("");'
	+ '$("#description").val("");'
	+ '$("#placeholder").val("");'
	+ '$("#default").val("");'
	+ '$("#options").val("");'
	+ '$("#required").prop("checked",false);'
	+ 'hideOptions();'
	+ '}'
	+ 'function hideOptions()'
	+ '{'
	+ '$("#options").hide();'
	+ '$("#optionslabel").hide();'
	+ '}'
	+ 'function showOptions()'
	+ '{'
	+ '$("#options").show();'
	+ '$("#optionslabel").show();'
	+ '}'
	+ 'function typeOnChange(thistype)'
	+ '{'
	+ 'var type = thistype;'
	+ 'if ((type=="select") | (type == "checkboxes"))'
	+ '{'
	+ 'showOptions();'
	+ '}else{'
	+ 'hideOptions();'
	+ '}'
	+ '}'
+ '$(document).ready(function() {'
+ '$("#fieldSelectBox").change(function()'
+ '{'
+ 'typeOnChange($(this).attr("value"));'
+ '});'
+ 'hideOptions();'
+ 'makeFieldList();'
+ '$("#add-field-form").hide();'
+ '$("#add-section-form").hide();'
+ '});';
return clear;

}