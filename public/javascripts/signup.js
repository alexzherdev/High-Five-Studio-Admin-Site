createSignupPanel = function(config) {
  var signup_panel = new Ext.FormPanel({
    url: config.url,
    baseParams: {
      'authenticity_token': config.token
    },
    title: 'Регистрация',
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
      name: 'user[login]',
      allowBlank: false
    },{
      xtype: 'textfield',
      fieldLabel: 'Пароль',
      name: 'user[password]',
      inputType: 'password',
      allowBlank: false
    },{
      xtype: 'textfield',
      fieldLabel: 'Еще раз',
      name: 'user[password_confirmation]',
      inputType: 'password',
      allowBlank: false
    },{
      xtype: 'textfield',
      fieldLabel: 'Имя',
      name: 'user[name]',
      allowBlank: false
    },{
      xtype: 'textfield',
      fieldLabel: 'E-mail',
      name: 'user[email]',
      vtype: 'email',
      allowBlank: false
    }],
    buttons: [{
      text: 'Зарегистрироваться',
      handler: function() {
        submitForm(signup_panel);
      }
    }],
    renderTo: 'signup_container'
  });
}
