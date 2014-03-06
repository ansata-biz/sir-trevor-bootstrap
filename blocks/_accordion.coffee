tab_template = '
  <div class="panel panel-default">
    <div class="panel-heading">
      <div class="buttons">
        <button type="button" class="close">&times;</button>
        <button type="button" class="reorder"><i class="st-icon st-icon-move"></i></button>
      </div>
      <h4 class="panel-title">
         <a data-toggle="collapse" contenteditable="true" class="st-required">
          Panel Heading
        </a>
      </h4>
    </div>
    <div class="panel-collapse collapse in">
      <div class="panel-body" contenteditable="true" class="st-required">
        Panel body
      </div>
    </div>
  </div>'

SirTrevor.Blocks.Accordion = SirTrevor.Block.extend {
  type: "accordion"
  title: 'Accordion'
  editorHTML: '<div class="panel-group st-text-block"></div>'
  icon_name: 'accordion'
  controllable: true

  constructor: (data, instance_id, sirTrevor) ->
    this.controls = {
      'add': this.addPanel
    }
    SirTrevor.Block.apply(this, arguments)

  addPanel: ->
    this.$('.panel-group').append(tab_template)

  onBlockRender: ->
    if this.$('.panel-group').children('.panel').length == 0
      this.$('.panel-group').append(tab_template)

    this.$('.panel-group').on 'click', 'button.close', ->
      if confirm 'Are you sure you want to remove this panel?'
        $(this).closest('.panel').remove()

    new Sortable this.$('.panel-group')[0], {
      handle: '.reorder'
      draggable: '.panel'
    }

  toData: ->
    data = {panels: []}

    this.$('.panel').each ->
      data.panels.push {
        title: $(this).find('.panel-title > a').html()
        body: $(this).find('.panel-body').html()
      }

    this.setData data

  loadData: (data) ->
    if typeof data != 'undefined'
      this.$('.panel').remove()
      for panel in data.panels
        $panel = $(tab_template)
        $panel.find('.panel-title > a').html(panel.title)
        $panel.find('.panel-body').html(panel.body)
        this.$('.panel-group').append($panel)
}