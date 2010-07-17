// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

var submitForm = function(form) {
  var basic = form.getForm();
  if (basic.isValid()) {
    if (form.url) {
      basic.getEl().dom.action = form.url;
    }
    if (form.baseParams) {
      for (i in form.baseParams) {
        form.add({
          xtype: "hidden",
          name: i,
          value: form.baseParams[i]
        })
      }
      form.doLayout();
    }
    basic.submit();
  }
}