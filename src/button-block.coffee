#
# Text Block
#
button_template = '<span class="btn btn-default st-required" contenteditable="true">Button</span>'

SirTrevor.Blocks.Button = SirTrevor.Block.extend {
  button_sizes:
    'btn-xs': 'X-Small'
    'btn-sm': 'Small'
    '': 'Default'
    'btn-lg': 'Large'
  button_styles:
    'btn-default': 'Default'
    'btn-primary': 'Primary'
    'btn-success': 'Success'
    'btn-info':    'Info'
    'btn-warning': 'Warning'
    'btn-danger':  'Danger'

  type: "button"
  title: 'Button'
  editorHTML: '
  <div class="st-button-form-wrapper form-inline well" style="margin: 10px; display: none;">
    <div class="form-group"> Size: <select name="size"></select> </div>
    <div class="form-group"> Style: <select name="style"></select> </div>
    <div class="form-group"> Full width: <input type="checkbox" name="is_block"/> </div>
    <div class="form-group"> URL: <input type="text" name="url" value=""/> </div>
    <button type="button">OK</button>
  </div>
  <div class="st-button-wrapper" style="text-align: center; min-height: 0">
      ' + button_template + '
  </div>'
  icon_name: 'button'

  loadData: (data) ->
    this.$find('.btn').html(SirTrevor.toHTML(data.text, this.type))

  _setBlockInner: ->
    SirTrevor.Block.prototype._setBlockInner.apply(this, arguments);

    $styles_select = this.$('[name=style]')
    for own style_class, style of @button_styles
      $styles_select.append $('<option/>').attr('value', style_class).text(style)
    $styles_select.val('btn-default')

    $sizes_select = this.$('[name=size]')
    for own size_class, size of @button_sizes
      $sizes_select.append $('<option/>').attr('value', size_class).text(size)
    $sizes_select.val('')

    $sizes_select.on 'change click', =>
      selected_size_class = $sizes_select.val()
      btn = this.getButton()
      for own size_class of @button_sizes
        btn.toggleClass size_class, size_class == selected_size_class

  onBlockRender: ->
    this.getWrapper().on 'click keyup', => this.checkForButton()

    this.getButton().on 'click', =>
      this.$('.st-button-form-wrapper').show('fast')

    this.$('.st-button-form-wrapper button').on 'click', =>
      this.$('.st-button-form-wrapper').hide('fast')

    $styles_select = this.$('[name=style]')
    $styles_select.on 'change click', =>
      selected_style_class = $styles_select.val()
      btn = this.getButton()
      for own style_class of @button_styles
        btn.toggleClass style_class, style_class == selected_style_class
    $styles_select.trigger 'change'

    $sizes_select = this.$('[name=size]')
    $sizes_select.on 'change click', =>
      selected_size_class = $sizes_select.val()
      btn = this.getButton()
      for own size_class of @button_sizes
        btn.toggleClass size_class, size_class == selected_size_class
    $sizes_select.trigger 'change'

    $block_checkbox = this.$('[name=is_block]').on 'change click', () =>
      this.getButton().toggleClass 'btn-block', $block_checkbox.is(':checked')
    $block_checkbox.trigger('change')


  checkForButton: ->
    if this.$('.btn').length == 0
      setTimeout =>
        if this.$('.btn').length == 0
          this.getWrapper().html(button_template)
      , 500

  getWrapper: -> this.$('.st-button-wrapper')
  getButton: -> this.$('.st-button-wrapper .btn')

  toData: ->
    data = {}
    this.$('select, input').each ->
      if this.getAttribute('type') == 'checkbox'
        value = $(this).is(':checked')
      else
        value = $(this).val()
      data[this.getAttribute('name')] = value
      return true # continue
    data.html = this.getButton().html()
    this.setData data

  loadData: (data) ->
    for own i, v of data
      $el = this.$('select, input').filter('[name='+i+']')
      if $el.attr('type') == 'checkbox'
        $el.attr('checked', 'yes') if v
      else
        $el.val(v)
    this.getButton().html(data.html)

#  _initUIComponents: =>
#    SirTrevor.Block.prototype._initUIComponents.apply(this, arguments);
#    this._withUIComponent new SirTrevor.BlockReorder(this.$el)
}