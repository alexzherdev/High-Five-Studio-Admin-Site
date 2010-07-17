createLoginPanel = function(config) {
  var login_panel = new Ext.FormPanel({
    url: config.url,
    baseParams: {
      'authenticity_token': config.token
    },
    title: 'Залогиньтесь',
    width: 350,
    bodyStyle: 'padding: 10px',
    frame: true,
    standardSubmit: true,
    defaults: {
      width: 210
    },
    items: [{
      xtype: 'textfield',
      fieldLabel: 'Логин',
      name: 'user_session[login]',
      allowBlank: false
    },{
      xtype: 'textfield',
      fieldLabel: 'Пароль',
      name: 'user_session[password]',
      inputType: 'password',
      allowBlank: false
    },{
      contentEl: 'actions_container',
      width: 315
    }],
    renderTo: 'login_container'
  });
  
  var login_button = new Ext.Button({
    text: 'Войти',
    handler: function() {
      submitForm(login_panel);
    },
    width: 80,
    renderTo: 'login_button'
  })
}
