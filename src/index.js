// ----------------------------------------------------------------------------
// concepts page addtions
// ----------------------------------------------------------------------------

var workspace_concepts_task1;

function changes_concepts_task1(primaryEvent) {
  var json_from_event = primaryEvent.toJson();
  // console.log(json_from_event);
  var saved_json_str = survey.getQuestionByName("concepts_blocks1_changes").value;
  var json_to_save;
  if (saved_json_str == null) {
    json_to_save = { "changes": [] };
  } else {
    // console.log("stored value=" + saved_json_str);
    json_to_save = JSON.parse(saved_json_str);
  }
  // console.log(json_to_save);
  json_to_save.changes.push(json_from_event);
  survey.getQuestionByName("concepts_blocks1_changes").value = JSON.stringify(json_to_save);
  // console.log(json_to_save);
}

function save_concepts_task1() {
  var xml = Blockly.Xml.workspaceToDom(workspace_concepts_task1);
  var xml_text = Blockly.Xml.domToText(xml);
  survey.getQuestionByName("concepts_blocks1_inserted").value = xml_text;
}

function inject_concepts_task1(question_id) {
  var question_div_name = "#" + question_id;
  var inject_div_name = "blockly_" + question_id;
  $(question_div_name).append("<div id=" + inject_div_name + " class='center-block'  style='height: 600px; width: 1024px;'></div>");

  Blockly.pathToBlockly = 'nclblocks/'
  workspace_concepts_task1 = Blockly.inject(inject_div_name, {
    media: Blockly.pathToBlockly + 'media/',
    toolbox: NclBlocks.defaultToolbox,
    scrollbars: true,
    sounds: true
  });
  Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(NclBlocks.START_WORKSPACE), workspace_concepts_task1);
  workspace_concepts_task1.addChangeListener(changes_concepts_task1);
  window.scrollTo(0, 0);
}

// ----------------------------------------------------------------------------
//  page addtions
// ----------------------------------------------------------------------------

function inject_ncl_task1(question_id) {
  var question_div_name = "#" + question_id;
  var code =
    `<script type="syntaxhighlighter" class="brush: xml; toolbar: false;">
  <![CDATA[
  <ncl>
    <head>
      <connectorBase>
        <causalConnector id="onKeySelectionStart">
          <connectorParam name="var"/>
          <connectorParam name="keyCode"/>
          <simpleCondition role="onSelection" key="$keyCode"/>
          <simpleAction role="start" max="unbounded"/>
        </causalConnector>
      </connectorBase>
    </head>
    <body>
      <port component="mainvideo"/>
      <media id="mainvideo" type="video/mp4" src="video.mp4">
        <property name="width" value="100%"/>
        <property name="height" value="100%"/>
        <area label="credits" begin="300s" end="360s" />
      </media>
      <link xconnector="onKeySelectionStart">
        <bind role="onSelection" component="mainvideo" interface="credits">
          <bindParam name="keyCode" value="RED"/>
        </bind>
        <bind role="start" component="mainvideo"/>
      </link>
    </body>
  </ncl>
  ]]></script>`;
  $(question_div_name).append(code);
  SyntaxHighlighter.highlight();
}

// ----------------------------------------------------------------------------
// html page addtions
// ----------------------------------------------------------------------------


function inject_ncl_task2(question_id) {
  var question_div_name = "#" + question_id;
  var code =
    `<script type="syntaxhighlighter" class="brush: xml; toolbar: false; highlight: [11,12,13,14,15,16,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48]">
  <![CDATA[
  <?xml version="1.0" encoding="ISO-8859-1"?>
  <ncl>
    <head>
      <connectorBase>
        <causalConnector id="onKeySelectionStart">
          <connectorParam name="var"/>
          <connectorParam name="keyCode"/>
          <simpleCondition role="onSelection" key="$keyCode"/>
          <simpleAction role="start" max="unbounded"/>
        </causalConnector>
        <!-- begin modification-->
        <causalConnector id="onRecognizeStart">
          <simpleCondition role="onRecognize" max="unbounded"/>
          <simpleAction role="start" max="unbounded"/>
        </causalConnector>
        <!-- end modification-->
      </connectorBase>
    </head>
    <body>
      <port component="mainvideo"/>
      <media id="mainvideo" type="video/mp4" src="video.mp4">
        <property name="width" value="100%"/>
        <property name="height" value="100%"/>
        <area label="credits" begin="300s" end="360s" />
      </media>
      <link xconnector="onKeySelectionStart">
        <bind role="onSelection" component="mainvideo" interface="credits">
          <bindParam name="keyCode" value="RED"/>
        </bind>
        <bind role="start" component="mainvideo"/>
      </link>
      <!-- begin modification-->
      <media id="tts" type="application/ssml+xml" src="question.ssml">
        <area label="repeat_question"/>
      </media>
      <input id="asr" type="application/srgs+xml" src="repeat.srgs">
        <area label="repeat_command"/>
      </input>
      <link xconnector="onBeginStart">
        <bind role="onBegin" component="mainvideo" interface="credits"/>
        <bind role="start" component="tts" interface="repeat_question"/>
        <bind role="start" component="answer"/>
      </link>
      <link xconnector="onRecognizeStart">
        <bind role="onRecognize" component="asr" interface="repeat_command"/>
        <bind role="start" component="mainvideo"/>
      </link>
      <!-- end modification-->
    </body>
  </ncl>
  ]]></script>`;
  $(question_div_name).append(code);
  SyntaxHighlighter.highlight();
}

// ----------------------------------------------------------------------------
// survey
// ----------------------------------------------------------------------------

function onRenderQuestion(target_survey, question_and_html) {
  // console.log(question_and_html);
  switch (question_and_html.question.name) {
    case "concepts_blocks1":
      inject_concepts_task1(question_and_html.question.idValue);
      break;
    case "ncl_code1":
      inject_ncl_task1(question_and_html.question.idValue);
      break;
    case "ncl_code2":
      inject_ncl_task2(question_and_html.question.idValue);
      break;
  }

}

// function onRenderPage(target_survey, page_and_html) {
//   console.log(page_and_html);
// }

// function onRenderSurvey(target_survey, survey_and_html) {
//   console.log(survey_and_html);
// }

// function onRenderPanel(target_survey, panel_and_html) {
//   console.log(panel_and_html);
// }

function onPageChanged(target_survey, old_and_new_page) {
  // console.log(old_and_new_page);
  // console.log(survey);
  if (old_and_new_page.oldCurrentPage.name == "concepts") {
    save_concepts_task1();
  }
}

var customSurveyStrings = {
  requiredError: "Por favor, responda a pergunta.",
};
Survey.surveyLocalization.locales["en"] = customSurveyStrings;
Survey.Survey.cssType = "bootstrap";

var survey = new Survey.Model(surveyJSON);
var survey_css = {
  // root
  "root": "h4 panel panel-default",
  "header": "h3 text-center breadcrumb",
  "body": "panel-body",
  "footer": "panel-footer text-center ",
  "pageTitle": "h3 text-center breadcrumb",
  // row
  "row": "",
  "question": { root: "h4 panel-body panel panel-default", title: "h4 breadcrumb" },
  "error": {
    "root": "",
    "icon": "glyphicon glyphicon-exclamation-sign",
    "item": "label label-danger"
  },
  "navigationButton": "h4 btn btn-primary"
};

if ($('#surveyPageNo').length) {
  for (var i = 0; i < survey.pages.length; i++) {
    $("<option />")
      .attr("value", i)
      .html(survey.pages[i].name)
      .appendTo("#surveyPageNo");
  }
}

$("#surveyContainer").Survey({
  model: survey,
  css: survey_css,
  onAfterRenderQuestion: onRenderQuestion,
  // onAfterRenderPage: onRenderPage,
  // onRenderPanel: onRenderPanel,
  onCurrentPageChanged: onPageChanged
  // onAfterRenderSurvey: onRenderSurvey
});

survey.currentPageNo = 2;