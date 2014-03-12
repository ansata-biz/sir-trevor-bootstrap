// Generated by CoffeeScript 1.6.3
(function() {
  var tab_template;

  tab_template = '\
  <div class="panel panel-default">\
    <div class="panel-heading">\
      <div class="buttons">\
        <button type="button" class="close">&times;</button>\
        <button type="button" class="reorder"><i class="st-icon st-icon-move"></i></button>\
      </div>\
      <h4 class="panel-title">\
         <a data-toggle="collapse" contenteditable="true" class="st-text-block st-required">\
          Panel Heading\
        </a>\
      </h4>\
    </div>\
    <div class="panel-collapse collapse in">\
      <div class="panel-body st-text-block st-required" contenteditable="true">\
        Panel body\
      </div>\
    </div>\
  </div>';

  SirTrevor.Blocks.Accordion = SirTrevor.Block.extend({
    type: "accordion",
    title: 'Accordion',
    editorHTML: '<div class="panel-group"></div>',
    icon_name: 'accordion',
    controllable: true,
    constructor: function(data, instance_id, sirTrevor) {
      this.controls = {
        'add': this.addPanel
      };
      return SirTrevor.Block.apply(this, arguments);
    },
    addPanel: function() {
      this.$('.panel-group').append(tab_template);
      return this._initTextBlocks();
    },
    onBlockRender: function() {
      if (this.$('.panel-group').children('.panel').length === 0) {
        this.$('.panel-group').append(tab_template);
        this._initTextBlocks();
      }
      this.$('.panel-group').on('click', 'button.close', function() {
        if (confirm('Are you sure you want to remove this panel?')) {
          return $(this).closest('.panel').trigger('destroy').remove();
        }
      });
      return new Sortable(this.$('.panel-group')[0], {
        handle: '.reorder',
        draggable: '.panel'
      });
    },
    toData: function() {
      var data;
      data = {
        panels: []
      };
      this.$('.panel').each(function() {
        return data.panels.push({
          title: $(this).find('.panel-title > a').html(),
          body: $(this).find('.panel-body').html()
        });
      });
      return this.setData(data);
    },
    loadData: function(data) {
      var $panel, panel, _i, _len, _ref, _results;
      if (typeof data !== 'undefined') {
        this.$('.panel').remove();
        _ref = data.panels;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          panel = _ref[_i];
          $panel = $(tab_template);
          $panel.find('.panel-title > a').html(panel.title);
          $panel.find('.panel-body').html(panel.body);
          _results.push(this.$('.panel-group').append($panel));
        }
        return _results;
      }
    }
  });

}).call(this);

/*
//@ sourceMappingURL=_accordion.map
*/
// Generated by CoffeeScript 1.6.3
(function() {
  var button_template,
    __hasProp = {}.hasOwnProperty;

  button_template = '<span class="btn btn-default st-required" contenteditable="true">Button</span>';

  SirTrevor.Blocks.Button = SirTrevor.Block.extend({
    button_sizes: {
      'btn-xs': 'X-Small',
      'btn-sm': 'Small',
      '': 'Default',
      'btn-lg': 'Large'
    },
    button_styles: {
      'btn-default': 'Default',
      'btn-primary': 'Primary',
      'btn-success': 'Success',
      'btn-info': 'Info',
      'btn-warning': 'Warning',
      'btn-danger': 'Danger'
    },
    type: "button",
    title: 'Button',
    editorHTML: '\
  <div class="st-button-form-wrapper form-inline well" style="margin: 10px; display: none;">\
    <div class="form-group"> Size: <select name="size"></select> </div>\
    <div class="form-group"> Style: <select name="style"></select> </div>\
    <div class="form-group"> Full width: <input type="checkbox" name="is_block"/> </div>\
    <div class="form-group"> URL: <input type="text" name="url" value=""/> </div>\
    <button type="button">OK</button>\
  </div>\
  <div class="st-button-wrapper" style="text-align: center; min-height: 0">\
      ' + button_template + '\
  </div>',
    icon_name: 'button',
    loadData: function(data) {
      return this.$find('.btn').html(SirTrevor.toHTML(data.text, this.type));
    },
    _setBlockInner: function() {
      var $sizes_select, $styles_select, size, size_class, style, style_class, _ref, _ref1,
        _this = this;
      SirTrevor.Block.prototype._setBlockInner.apply(this, arguments);
      $styles_select = this.$('[name=style]');
      _ref = this.button_styles;
      for (style_class in _ref) {
        if (!__hasProp.call(_ref, style_class)) continue;
        style = _ref[style_class];
        $styles_select.append($('<option/>').attr('value', style_class).text(style));
      }
      $styles_select.val('btn-default');
      $sizes_select = this.$('[name=size]');
      _ref1 = this.button_sizes;
      for (size_class in _ref1) {
        if (!__hasProp.call(_ref1, size_class)) continue;
        size = _ref1[size_class];
        $sizes_select.append($('<option/>').attr('value', size_class).text(size));
      }
      $sizes_select.val('');
      return $sizes_select.on('change click', function() {
        var btn, selected_size_class, _ref2, _results;
        selected_size_class = $sizes_select.val();
        btn = _this.getButton();
        _ref2 = _this.button_sizes;
        _results = [];
        for (size_class in _ref2) {
          if (!__hasProp.call(_ref2, size_class)) continue;
          _results.push(btn.toggleClass(size_class, size_class === selected_size_class));
        }
        return _results;
      });
    },
    onBlockRender: function() {
      var $block_checkbox, $sizes_select, $styles_select,
        _this = this;
      this.getWrapper().on('click keyup', function() {
        return _this.checkForButton();
      });
      this.getButton().on('click', function() {
        return _this.$('.st-button-form-wrapper').show('fast');
      });
      this.$('.st-button-form-wrapper button').on('click', function() {
        return _this.$('.st-button-form-wrapper').hide('fast');
      });
      $styles_select = this.$('[name=style]');
      $styles_select.on('change click', function() {
        var btn, selected_style_class, style_class, _ref, _results;
        selected_style_class = $styles_select.val();
        btn = _this.getButton();
        _ref = _this.button_styles;
        _results = [];
        for (style_class in _ref) {
          if (!__hasProp.call(_ref, style_class)) continue;
          _results.push(btn.toggleClass(style_class, style_class === selected_style_class));
        }
        return _results;
      });
      $styles_select.trigger('change');
      $sizes_select = this.$('[name=size]');
      $sizes_select.on('change click', function() {
        var btn, selected_size_class, size_class, _ref, _results;
        selected_size_class = $sizes_select.val();
        btn = _this.getButton();
        _ref = _this.button_sizes;
        _results = [];
        for (size_class in _ref) {
          if (!__hasProp.call(_ref, size_class)) continue;
          _results.push(btn.toggleClass(size_class, size_class === selected_size_class));
        }
        return _results;
      });
      $sizes_select.trigger('change');
      return $block_checkbox = this.$('[name=is_block]').on('change click', function() {
        return _this.getButton().toggleClass('btn-block', $block_checkbox.is(':checked'));
      });
    },
    checkForButton: function() {
      var _this = this;
      if (this.$('.btn').length === 0) {
        return setTimeout(function() {
          if (_this.$('.btn').length === 0) {
            return _this.getWrapper().html(button_template);
          }
        }, 500);
      }
    },
    getWrapper: function() {
      return this.$('.st-button-wrapper');
    },
    getButton: function() {
      return this.$('.st-button-wrapper .btn');
    },
    toData: function() {
      var data;
      data = {};
      this.$('select, input').each(function() {
        var value;
        if (this.getAttribute('type') === 'checkbox') {
          value = $(this).is(':checked');
        } else {
          value = $(this).val();
        }
        return data[this.getAttribute('name')] = value;
      });
      data.html = this.getButton().html();
      return this.setData(data);
    },
    loadData: function(data) {
      var $el, i, v;
      for (i in data) {
        if (!__hasProp.call(data, i)) continue;
        v = data[i];
        $el = this.$('select, input').filter('[name=' + i + ']');
        if ($el.attr('type') === 'checkbox') {
          $el.attr('checked', 'yes');
        } else {
          $el.val(v);
        }
      }
      return this.getButton().html(data.html);
    }
  });

}).call(this);

/*
//@ sourceMappingURL=_button.map
*/
