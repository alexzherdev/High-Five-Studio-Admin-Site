Global.getAdminYear = function() {
  return Global.year;
}

Global.getAdminMonth = function() {
  return Global.month;
}

createAdminshipsPanel = function(config) {
  var adminships_cm = new Ext.grid.ColumnModel(config.cm);
  
  var adminships_store = new Ext.data.JsonStore(config.store);
  
  var summary = new Ext.ux.grid.GroupSummary();
  
  adminships_store.on('load', function() {
    summary.refreshSummaryById();
  });
  Global.adminships_panel = new Ext.grid.EditorGridPanel({
    title: 'Администрирование',
    autoScroll: true,
    cm: adminships_cm,
    store: adminships_store,
    clicksToEdit: 1,
    plugins: summary,
    tbar: [{
      text: '',
      iconCls: 'x-tbar-page-prev',
      handler: function() {
        if (Global.month == 1) {
          Global.month = 12;
          Global.year--;
        } else {
          Global.month--;
        }
        Global.adminships_panel.loadAdminships();
      }
      },{
        id: 'adminships_date',
        xtype: 'tbtext',
        width: 80,
        style: { 'text-align': 'center' }
      },{
      text: '',
      iconCls: 'x-tbar-page-next',
      handler: function() {
        if (Global.month == 12) {
          Global.month = 1;
          Global.year++;
        } else {
          Global.month++;
        }
        Global.adminships_panel.loadAdminships();
      }
      }
    ],
    listeners: {
      afterrender: function(grid) {
        Global.year = config.initial_year;
        Global.month = config.initial_month;
        grid.loadAdminships();
      },
      afteredit: function(e) {
        e.record.commit();
      }
    },
  
    //renderTo: 'adminships_container',
    
    updateDate: function() {
      Ext.getCmp('adminships_date').setText('<p>' + Global.months[Global.getAdminMonth() - 1] + ' ' + Global.getAdminYear() + '</p>');
    },
    
    loadAdminships: function() {
      this.updateDate();
      this.getStore().load({
        params: {
          year: Global.getAdminYear(),
          month: Global.getAdminMonth()
        }
      });
    }
  });

  Global.content_container.removeAll();
  Global.content_container.add(Global.adminships_panel);
  Global.viewport.doLayout();
}