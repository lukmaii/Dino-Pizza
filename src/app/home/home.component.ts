import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import * as go from 'gojs';
import { DiagramComponent } from 'gojs-angular';
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class HomeComponent implements OnInit {
  productName = '';
  clicked = [false, false, false, false];
  selectedValue = [0, 0, 0, 0];
  crustOpt = '';
  size = '';
  cheeseOpt = '';

  pizza = [{ id: 1, src: 'assets/img/Hawaiian.png', name: 'ฮาวายเอียน' },
  { id: 2, src: 'assets/img/Superdelux.png', name: 'ซูปเปอร์เดอลุกซ์' },
  { id: 3, src: 'assets/img/SeafoodDelux.png', name: 'ซีฟู้ดคอกเทล' }]
  // init product img
  imageSrc = '/assets/img/Empty.png';

  pizzaCheeses = [{ id: 1, src: '/assets/img/HawaiianwithCheese.png', name: 'ฮาวายเอียน' },
  { id: 2, src: '/assets/img/SuperdeluxwithCheese.png', name: 'ซูปเปอร์เดอลุกซ์' },
  { id: 3, src: '/assets/img/SeafoodDeluxwithCheese.png', name: 'ซีฟู้ดคอกเทล' }]

  pizzaSizes = [{ id: 1, src: '/assets/img/S.png', name: 'เล็ก' },
  { id: 2, src: '/assets/img/M.png', name: 'กลาง' },
  { id: 3, src: '/assets/img/L.png', name: 'ใหญ่' }]

  crustOpts = [{ id: 1, opt: 'หนานุ่ม' }, { id: 2, opt: 'บางกรอบ' }]

  cheeseOpts = [{ id: 1, opt: 'เพิ่มชีส' }, { id: 2, opt: 'ไม่เพิ่มชีส' }]

  constructor(private cdr: ChangeDetectorRef, private el: ElementRef) { }
  ngOnInit(): void {

  }

  onClickMenuBt(imageNameObject: any) {
    this.imageSrc = imageNameObject.src;
    this.productName = imageNameObject.name;
    this.clicked[0] = true;
  }

  onClickCrust(opt: string) {
    this.crustOpt = opt;
    this.clicked[1] = true;
  }

  onClickTopping(opt: string) {
    this.cheeseOpt = opt;
    if (opt === 'เพิ่มชีส') {
      this.pizzaCheeses.forEach(obj => {
        if (obj.name === this.productName) {
          console.log(obj.name);
          this.imageSrc = obj.src;
        }
      })
    }
    // else {
    //   this.pizzaCheeses.forEach(obj => {
    //     if (obj.name === this.productName) {
    //       this.imageSrc = obj.src
    //     }
    //   })
    // }
    this.clicked[2] = true;
  }

  onClickSize(size: string) {
    this.size = size;
    this.clicked[3] = true;
  }

  onClickCancle() {
    this.clicked = [false, false, false, false];
    this.selectedValue = [0, 0, 0, 0];
    this.imageSrc = '/assets/img/Empty.png';
    this.productName = '';
    this.crustOpt = '';
    this.cheeseOpt = '';
    this.size = '';
  }

  //--------------------- dfa ---------------------//

  @ViewChild('myDiagram', { static: true })
  public myDiagramComponent!: DiagramComponent;
  // initialize diagram / templates
  public initDiagram(): go.Diagram {

    const $ = go.GraphObject.make;
    const dia = $(go.Diagram, {
      "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom, // have mouse wheel events zoom in and out instead of scroll up and down

      model: $(go.GraphLinksModel,
        {
          linkKeyProperty: 'key' // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
        }
      )
    });

    dia.commandHandler.archetypeGroupData = { key: 'Group', isGroup: true };
    dia.isReadOnly = true;

    // define the Node template
    dia.nodeTemplate =
      $(go.Node, 'Spot',
        {
          desiredSize: new go.Size(100, 100),
        },
        new go.Binding("location", "loc", go.Point.parse), //fix node location 
        $(go.Panel, 'Auto',
          $(go.Shape, 'Circle', { stroke: null, fill: 'lightblue' },
            new go.Binding('fill', 'color') //fill color from nodedata.color
          ),
          $(go.TextBlock, { textAlign: "center" },
            new go.Binding('text'),
            new go.Binding('stroke', 'txtStroke')) // binding to get TextBlock.text from nodedata.text
        ),
      );

    dia.nodeTemplateMap.add("Start",
      $(go.Node, "Spot", { desiredSize: new go.Size(100, 100) },
        new go.Binding("location", "loc", go.Point.parse),
        $(go.Shape, "Circle",
          {
            fill: "#52ce60", /* green */
            stroke: null,
          }),
        $(go.TextBlock, new go.Binding("text"),
          {
            font: "bold 16pt helvetica, bold arial, sans-serif",
            stroke: "whitesmoke"
          })
      )
    );

    dia.nodeTemplateMap.add("End",
      $(go.Node, "Spot", { desiredSize: new go.Size(100, 100) },
        new go.Binding("location", "loc", go.Point.parse),
        $(go.Shape, "Circle",
          {
            fill: "maroon",
            stroke: null,
          },
          new go.Binding("fill", "color")),
        $(go.Shape, "Circle", { fill: null, desiredSize: new go.Size(90, 90), strokeWidth: 2, stroke: "whitesmoke" }),
        $(go.TextBlock, new go.Binding("text"),
          {
            font: "bold 16pt helvetica, bold arial, sans-serif",
            stroke: "whitesmoke"
          })
      )
    );

    dia.linkTemplate =
      $(go.Link, { routing: go.Link.AvoidsNodes, corner: 10, curve: go.Link.JumpOver },
        new go.Binding("points"),
        $(go.Shape,      // the link shape
          new go.Binding('stroke'),
          new go.Binding('strokeWidth')),
        $(go.Shape,      // the arrowhead
          { toArrow: 'Standard' },
          new go.Binding('fill'),
          new go.Binding('stroke', 'arrStroke')),
        $(go.TextBlock, 'transition',   // this is a Link label
          { segmentIndex: NaN, background: 'whitesmoke', textAlign: "center" },
          new go.Binding('text'),
          new go.Binding('segmentFraction'),
          new go.Binding('segmentOffset'),
        )
      );

    return dia;
  }

  public diagramNodeData: Array<go.ObjectData> = [
    { key: 0, text: 'Start', loc: '0, 300', category: "Start" },
    { key: 1, text: 'ฮาวายเอียน', loc: '250 100' },
    { key: 2, text: 'ซูปเปอร์\nเดอลุกซ์', loc: '250 300' },
    { key: 3, text: 'ซีฟู้ด\nคอกเทล', loc: '250 500' },
    { key: 4, text: 'หนานุ่ม', loc: '550 200' },
    { key: 5, text: 'บางกรอบ', loc: '550 400' },
    { key: 6, text: 'เพิ่มชีส', loc: '800 200' },
    { key: 7, text: 'ไม่เพิ่มชีส', loc: '800 400' },
    { key: 8, text: 'เล็ก', loc: '1100 100' },
    { key: 9, text: 'กลาง', loc: '1100 300' },
    { key: 10, text: 'ใหญ่', loc: '1100 500' },
    { key: 11, text: 'Trap', loc: '1350 100' },
    { key: 12, text: 'finish', loc: '1350 300', category: "End" }
  ];
  public diagramLinkData: Array<go.ObjectData> = [
    //from Start
    { key: -1, from: 0, to: 0, segmentFraction: 0.5, points: [75, 305, 75, 270, 25, 270, 25, 305], segmentOffset: new go.Point(0, 30), text: 'หนานุ่ม, บางกรอบ, เพิ่มชีส,\nไม่เพิ่มชีส, เล็ก, กลาง, ใหญ่,\nConfirm, Complete, Cancle' },
    { key: -2, from: 0, to: 1, segmentFraction: 0.5, points: [95, 325, 250, 150], text: 'ฮาวายเอียน' },
    { key: -3, from: 0, to: 2, segmentFraction: 0.5, points: [100, 350, 250, 350], text: 'ซูปเปอร์เดอลุกซ์' },
    { key: -4, from: 0, to: 3, segmentFraction: 0.5, points: [95, 375, 250, 550], text: 'ซีฟู้ดคอกเทล' },
    //from ฮาวายเอียน
    { key: -5, from: 1, to: 0, segmentFraction: 0.83, points: [345, 175, 365, 175, 365, 650, 75, 650, 75, 395], text: 'Cancle' },
    { key: -6, from: 1, to: 1, segmentFraction: 0.5, points: [325, 105, 325, 70, 275, 70, 275, 105], segmentOffset: new go.Point(0, 30), text: 'ฮาวายเอียน, ซีฟู้ดคอกเทล,\nซูปเปอร์เดอลุกซ์, เพิ่มชีส,\nไม่เพิ่มชีส, เล็ก, กลาง, ใหญ่,\nConfirm, Complete' },
    { key: -7, from: 1, to: 4, segmentFraction: 0.8, points: [345, 125, 555, 225], text: 'หนานุ่ม' },
    { key: -8, from: 1, to: 5, segmentFraction: 0.86, points: [350, 150, 555, 425], text: 'บางกรอบ' },
    //from ซูปเปอร์เดอลุกซ์
    { key: -9, from: 2, to: 0, segmentFraction: 0.785, points: [345, 375, 355, 375, 355, 650, 75, 650, 75, 395], text: 'Cancle' },
    { key: -10, from: 2, to: 2, segmentFraction: 0.65, points: [325, 305, 325, 270, 275, 270, 275, 305], segmentOffset: new go.Point(0, 30), text: 'ฮาวายเอียน, ซีฟู้ดคอกเทล,\nซูปเปอร์เดอลุกซ์, เพิ่มชีส,\nไม่เพิ่มชีส, เล็ก, กลาง, ใหญ่,\nConfirm, Complete' },
    { key: -11, from: 2, to: 4, segmentFraction: 0.8, points: [345, 325, 550, 250], text: 'หนานุ่ม' },
    { key: -12, from: 2, to: 5, segmentFraction: 0.79, points: [350, 350, 550, 450], text: 'บางกรอบ' },
    //from ซีฟู้ดคอกเทล
    { key: -13, from: 3, to: 0, segmentFraction: 0.66, points: [300, 600, 300, 650, 75, 650, 75, 395], text: 'Cancle' },
    { key: -14, from: 3, to: 3, segmentFraction: 0.7, points: [325, 505, 325, 470, 275, 470, 275, 505], segmentOffset: new go.Point(0, 30), text: 'ฮาวายเอียน, ซีฟู้ดคอกเทล,\nซูปเปอร์เดอลุกซ์, เพิ่มชีส,\nไม่เพิ่มชีส, เล็ก, กลาง, ใหญ่,\nConfirm, Complete' },
    { key: -15, from: 3, to: 4, segmentFraction: 0.8, points: [345, 525, 555, 275], text: 'หนานุ่ม' },
    { key: -16, from: 3, to: 5, segmentFraction: 0.755, points: [350, 550, 555, 475], text: 'บางกรอบ' },
    //from หนานุ่ม
    { key: -17, from: 4, to: 0, segmentFraction: 0.858, points: [645, 275, 665, 275, 665, 650, 75, 650, 75, 395], text: 'Cancle' },
    { key: -18, from: 4, to: 4, segmentFraction: 0.5, points: [625, 205, 625, 170, 575, 170, 575, 205], segmentOffset: new go.Point(0, 30), text: 'ฮาวายเอียน, ซีฟู้ดคอกเทล,\nซูปเปอร์เดอลุกซ์, หนานุ่ม,\nบางกรอบ, เล็ก, กลาง, ใหญ่,\nConfirm, Complete' },
    { key: -19, from: 4, to: 6, segmentFraction: 0.75, points: [645, 225, 805, 225], text: 'เพิ่มชีส' },
    { key: -20, from: 4, to: 7, segmentFraction: 0.8, points: [650, 250, 805, 425], text: 'ไม่เพิ่มชีส' },
    //from บางกรอบ
    { key: -21, from: 5, to: 0, segmentFraction: 0.81, points: [600, 500, 600, 650, 75, 650, 75, 395], text: 'Cancle' },
    { key: -22, from: 5, to: 5, segmentFraction: 0.5, points: [625, 405, 625, 370, 575, 370, 575, 405], segmentOffset: new go.Point(0, 30), text: 'ฮาวายเอียน, กลาง\nซูปเปอร์เดอลุกซ์, เล็ก,\nซีฟู้ดคอกเทล, ใหญ่,\nหนานุ่ม, บางกรอบ,\nConfirm, Complete' },
    { key: -23, from: 5, to: 6, segmentFraction: 0.75, points: [645, 425, 805, 275], text: 'เพิ่มชีส' },
    { key: -24, from: 5, to: 7, segmentFraction: 0.7, points: [650, 450, 800, 450], text: 'ไม่เพิ่มชีส' },
    //from เพิ่มชีส
    { key: -25, from: 6, to: 0, segmentFraction: 0.881, points: [892, 280, 910, 280, 910, 650, 75, 650, 75, 395], text: 'Cancle' },
    { key: -26, from: 6, to: 6, segmentFraction: 0.5, points: [875, 205, 875, 170, 825, 170, 825, 205], segmentOffset: new go.Point(0, 30), text: 'ฮาวายเอียน, ซีฟู้ดคอกเทล,\nซูปเปอร์เดอลุกซ์, หนานุ่ม,\nบางกรอบ, เพิ่มชีส, ไม่เพิ่มชีส,\nConfirm, Complete' },
    { key: -27, from: 6, to: 8, segmentFraction: 0.7, points: [892, 220, 1105, 125], text: 'เล็ก' },
    { key: -28, from: 6, to: 9, segmentFraction: 0.7, points: [898, 240, 1105, 325], text: 'กลาง' },
    { key: -29, from: 6, to: 10, segmentFraction: 0.7, points: [898, 260, 1105, 525], text: 'ใหญ่' },
    //from ไม่เพิ่มชีส
    { key: -30, from: 7, to: 0, segmentFraction: 0.851, points: [850, 500, 850, 650, 75, 650, 75, 395], text: 'Cancle' },
    { key: -31, from: 7, to: 7, segmentFraction: 0.5, points: [875, 405, 875, 370, 825, 370, 825, 405], segmentOffset: new go.Point(0, 30), text: 'ฮาวายเอียน, หนานุ่ม,\nซูปเปอร์เดอลุกซ์,\nซีฟู้ดคอกเทล, เพิ่มชีส,\nบางกรอบ, ไม่เพิ่มชีส,\nConfirm, Complete' },
    { key: -32, from: 7, to: 8, segmentFraction: 0.7, points: [892, 425, 1105, 175], text: 'เล็ก' },
    { key: -33, from: 7, to: 9, segmentFraction: 0.7, points: [898, 450, 1105, 375], text: 'กลาง' },
    { key: -34, from: 7, to: 10, segmentFraction: 0.7, points: [892, 475, 1105, 575], text: 'ใหญ่' },
    //from เล็ก
    { key: -35, from: 8, to: 0, segmentFraction: 0.909, points: [1195, 175, 1220, 175, 1220, 650, 75, 650, 75, 395], text: 'Cancle' },
    { key: -36, from: 8, to: 8, segmentFraction: 0.5, points: [1175, 105, 1175, 70, 1125, 70, 1125, 105], segmentOffset: new go.Point(0, 30), text: 'ฮาวายเอียน, บางกรอบ,\nซีฟู้ดคอกเทล, หนานุ่ม,\nซูปเปอร์เดอลุกซ์,\nเพิ่มชีส, ไม่เพิ่มชีส, เล็ก,\nกลาง, ใหญ่, Complete' },
    { key: -37, from: 8, to: 12, segmentFraction: 0.7, points: [1200, 150, 1355, 325], text: 'Confirm' },
    //from กลาง
    { key: -38, from: 9, to: 0, segmentFraction: 0.898, points: [1195, 375, 1210, 375, 1210, 650, 75, 650, 75, 395], text: 'Cancle' },
    { key: -39, from: 9, to: 9, segmentFraction: 0.55, points: [1175, 305, 1175, 270, 1125, 270, 1125, 305], segmentOffset: new go.Point(0, 30), text: 'ฮาวายเอียน, บางกรอบ,\nซีฟู้ดคอกเทล, หนานุ่ม,\nซูปเปอร์เดอลุกซ์,\nเพิ่มชีส, ไม่เพิ่มชีส, เล็ก,\nกลาง, ใหญ่, Complete' },
    { key: -40, from: 9, to: 12, segmentFraction: 0.7, points: [1200, 350, 1350, 350], text: 'Confirm' },
    //from ใหญ่
    { key: -41, from: 10, to: 0, segmentFraction: 0.878, points: [1150, 600, 1150, 650, 75, 650, 75, 395], text: 'Cancle' },
    { key: -42, from: 10, to: 10, segmentFraction: 0.55, points: [1175, 505, 1175, 470, 1125, 470, 1125, 505], segmentOffset: new go.Point(0, 30), text: 'ฮาวายเอียน, บางกรอบ,\nซีฟู้ดคอกเทล, หนานุ่ม,\nซูปเปอร์เดอลุกซ์,\nเพิ่มชีส, ไม่เพิ่มชีส, เล็ก,\nกลาง, ใหญ่, Complete' },
    { key: -43, from: 10, to: 12, segmentFraction: 0.7, points: [1200, 550, 1355, 375], text: 'Confirm' },
    //from finish
    { key: -44, from: 12, to: 0, segmentFraction: 0.9, points: [1400, 400, 1400, 660, 25, 660, 25, 395], text: 'Complete' },
    { key: -45, from: 12, to: 11, segmentFraction: 0.4, points: [1400, 300, 1400, 200], text: 'ฮาวายเอียน, ซีฟู้ดคอกเทล,\nซูปเปอร์เดอลุกซ์, หนานุ่ม,\nบางกรอบ, เพิ่มชีส, เล็ก,\nไม่เพิ่มชีส, กลาง, ใหญ่,\nConfirm Cancle' },
    //from trap
    { key: -46, from: 11, to: 0, segmentFraction: 0.915, points: [1450, 150, 1470, 150, 1470, 660, 25, 660, 25, 395], text: 'Complete' },
    { key: -47, from: 11, to: 11, segmentFraction: 0.5, points: [1425, 105, 1425, 70, 1375, 70, 1375, 105], segmentOffset: new go.Point(0, 30), text: 'ฮาวายเอียน, ซีฟู้ดคอกเทล,\nซูปเปอร์เดอลุกซ์, หนานุ่ม,\nบางกรอบ, เพิ่มชีส, เล็ก,\nไม่เพิ่มชีส, กลาง, ใหญ่,\nConfirm Cancle' },
  ];

  public diagramDivClassName: string = 'myDiagramDiv';
  public diagramModelData = { prop: 'value' };
  public skipsDiagramUpdate = false;
  public observedDiagram: any;
  // currently selected node; for inspector
  public selectedNode: go.Node | null = null;

  public ngAfterViewInit() {
    if (this.observedDiagram) return;
    this.observedDiagram = this.myDiagramComponent.diagram;
    this.cdr.detectChanges(); // IMPORTANT: without this, Angular will throw ExpressionChangedAfterItHasBeenCheckedError (dev mode only)

    const appComp: HomeComponent = this;
    // listener for inspector
    this.myDiagramComponent.diagram.addDiagramListener('ChangedSelection', function (e) {
      if (e.diagram.selection.count === 0) {
        appComp.selectedNode = null;
      }
      const node = e.diagram.selection.first();
      if (node instanceof go.Node) {
        appComp.selectedNode = node;
      } else {
        appComp.selectedNode = null;
      }
    });
  } // end ngAfterViewInit

  public currState = 0;

  public selectedPath(buttonName: string) {

    for (let j = 0; j < this.diagramLinkData.length; j++) {

      if (this.diagramLinkData[j].from == this.currState && this.diagramLinkData[j].text.includes(buttonName)) {

        //change link data
        const link = _.cloneDeep(this.diagramLinkData[j]);
        link.stroke = '#52ce60';
        link.strokeWidth = 3;
        link.fill = '#52ce60';
        link.arrStroke = '#52ce60';
        this.diagramLinkData[j] = _.cloneDeep(link);

        //change node data
        const node = _.cloneDeep(this.diagramNodeData[this.diagramLinkData[j].to]);
        node.color = '#52ce60';
        node.txtStroke = 'whitesmoke';
        this.diagramNodeData[this.diagramLinkData[j].to] = _.cloneDeep(node);

        this.currState = this.diagramLinkData[j].to;
        break;

      }
    }
  }

}
