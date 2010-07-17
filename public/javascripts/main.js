Ext.onReady(function() {
  Global.menu_panel = new Ext.tree.TreePanel({
    region: 'west',
    split: true,
    width: 225,
    minSize: 175,
    maxSize: 400,
    collapsible: true,
    margins: '0 0 5 5',
    cmargins: '0 5 5 5',
    rootVisible: false,
    lines: false,
    autoScroll: true,
    root: new Ext.tree.TreeNode('My Feeds'),
    collapseFirst: false,
    
    addItem: function(attrs) {
      Ext.apply(attrs, {
          iconCls: 'feed-icon',
          leaf: true,
          cls: 'menu-item',
          id: attrs.url
      });
      var node = new Ext.tree.TreeNode(attrs);
      this.getRootNode().appendChild(node);
      return node;
    }
  });
  
  Global.menu_panel.getSelectionModel().on('selectionchange', function(sm, node) {
    content_panel.load({ url: node.id, method: 'GET', scripts: true });
  });
  
  var content_panel = new Ext.Panel({
    region: 'center'
  });
  
  var viewport = new Ext.Viewport({
    layout: 'border',
    items: [
      new Ext.BoxComponent({ // raw element
        region: 'north',
        el: 'header',
        height: 32
      }),
      Global.menu_panel,
      content_panel
    ]
  });
});