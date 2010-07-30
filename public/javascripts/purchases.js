createPurchasesPanel = function(config) {
  var planned_store = new Ext.data.JsonStore(config.planned_store);
  
  Global.purchases_panel = new Ext.TabPanel({
    items: [{
      title: 'Планируемые',
      html: ''
    }, {
      title: 'Совершенные',
      html: ''
    }],
    activeTab: 0,
    tbar: [{
      text: 'Добавить',
      iconCls: 'add-icon'
    }]
  });
  
  Global.content_container.removeAll();
  Global.content_container.add(Global.purchases_panel);
  Global.viewport.doLayout();
}