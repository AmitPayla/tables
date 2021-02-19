import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "./index.css";
import React, { useState, useEffect } from "react";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { NodeService } from "./service/NodeService";

const App = () => {
  const [nodes, setNodes] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState({});
  const nodeservice = new NodeService();

  const columns = [
    {
      header: <span>Name <span style={{padding:'0px 50px'}}>Expand all</span></span>,
      field: "name"
    },
    {
      header: <span>Size <i className="pi pi-calendar-plus" /></span>,
      field: "size",
    },
    {
      header:  <span>Type <i className="pi pi-calendar-plus" /></span>,
      field: "type"
    }
  ];

  const toggleApplications = () => {
    let _expandedKeys = { ...expandedKeys };
    if (_expandedKeys["0"]) delete _expandedKeys["0"];
    else _expandedKeys["0"] = true;

    setExpandedKeys(_expandedKeys);
  };

  useEffect(() => {
    nodeservice.getTreeTableNodes().then((data) => setNodes(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


      const onSizeValueChange = (node,value) => {
        let newNodes = JSON.parse(JSON.stringify(nodes));
        let editedNode = findNodeByKey(newNodes, node.key);
        editedNode.data['size'] = value;

        setNodes(newNodes);
    }

    const onTypeValueChange = (node,value) => {
        let newNodes = JSON.parse(JSON.stringify(nodes));
        let editedNode = findNodeByKey(newNodes, node.key);
        editedNode.data['type'] = value;

        setNodes(newNodes);
    }

        const findNodeByKey = (nodes, key) => {
        let path = key.split('-');
        let node;

        while (path.length) {
            let list = node ? node.children : nodes;
            node = list[parseInt(path[0], 10)];
            path.shift();
        }

        return node;
    }

  const actionTemplateForSize = (node, column) => {
      console.log(node ,"dslkvndajbv")
    return (
      <div>
        <input  value={node.data['size']} onChange={(e) => onSizeValueChange(node, e.target.value)}/>
      </div>
    );
  };

  const actionTemplateForType = (node, column) => {
    console.log(node ,"dslkvndajbv")
  return (
    <div>
      <input  value={node.data['type']} onChange={(e) => onTypeValueChange(node, e.target.value)}/>
    </div>
  );
};

  const dynamicColumns = columns.map((col, i) => {
    if (col.field === "name") {
      return (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
          expander
        />
      );
    }
    if (col.field === "size") {
      return (
        <Column
          key={col.field}
          header={col.header}
          body={actionTemplateForSize}
          style={{ textAlign: "center" }}
        />
      );
    } else {
      return (
        <Column
          key={col.field}
          header={col.header}
          body={actionTemplateForType}
          style={{ textAlign: "center" }}
        />
      );
    }
  });

  return (
    <div>
      <div className="card">
        <h5>Basic</h5>
        <TreeTable value={nodes}>
          {/* <Column field="name" header="Name" expander></Column>
                    <Column field="size" header="Size"></Column>
                    <Column field="type" header="Type"></Column> */}
          {dynamicColumns}
        </TreeTable>
      </div>

      <div className="card">
        <h5>Programmatic</h5>
        <Button onClick={toggleApplications} label="Toggle Applications" />
        <TreeTable
          value={nodes}
          expandedKeys={expandedKeys}
          onToggle={(e) => setExpandedKeys(e.value)}
          style={{ marginTop: ".5em" }}
        >
          {/* <Column field="name" header="Name" expander></Column>
          <Column field="size" header="Size"></Column>
          <Column field="type" header="Type"></Column> */}
          {dynamicColumns}
        </TreeTable>
      </div>
    </div>
  );
};

export default App

// import 'primeicons/primeicons.css';
// import 'primereact/resources/themes/saga-blue/theme.css';
// import 'primereact/resources/primereact.css';
// import 'primeflex/primeflex.css';
// import './index.css';
// import ReactDOM from 'react-dom';

// import React, { useState, useEffect } from 'react';
// import { TreeTable } from 'primereact/treetable';
// import { Column } from 'primereact/column';
// import { InputText } from 'primereact/inputtext';
// import { NodeService } from './service/NodeService';
// // import './TreeTableDemo.css';

// const App = () => {
//     const [nodes, setNodes] = useState([]);
//     const nodeservice = new NodeService();

//     useEffect(() => {
//         nodeservice.getTreeTableNodes().then(data => setNodes(data));
//     }, []); // eslint-disable-line react-hooks/exhaustive-deps

//     const onEditorValueChange = (props, value) => {
//         let newNodes = JSON.parse(JSON.stringify(nodes));
//         let editedNode = findNodeByKey(newNodes, props.node.key);
//         editedNode.data[props.field] = value;

//         setNodes(newNodes);
//     }

//     const findNodeByKey = (nodes, key) => {
//         let path = key.split('-');
//         let node;

//         while (path.length) {
//             let list = node ? node.children : nodes;
//             node = list[parseInt(path[0], 10)];
//             path.shift();
//         }

//         return node;
//     }

//     const inputTextEditor = (props, field) => {
//         return (
//             <InputText type="text" value={props.node.data[field]}
//                 onChange={(e) => onEditorValueChange(props, e.target.value)} />
//         );
//     }

//     const sizeEditor = (props) => {
//         return (
//             <div>
//                 <input type="text" value={props.node.data['size']}
//                 onChange={(e) => onEditorValueChange(props, e.target.value)} />
//             </div>
            
//         ) 
//         // inputTextEditor(props, 'size');
//     }

//     const typeEditor = (props) => {
//         return inputTextEditor(props, 'type');
//     }

//     const requiredValidator = (e) => {
//         let props = e.columnProps;
//         let value = props.node.data[props.field];

//         return value && value.length > 0;
//     }

//     return (
//         <div>
//             <div className="card">
//                 <TreeTable value={nodes}>
//                     <Column field="name" header="Name" expander style={{ height: '3.5em' }}></Column>
//                     <Column field="size" header="Size" editor={sizeEditor} editorValidator={requiredValidator} style={{ height: '3.5em' }}></Column>
//                     <Column field="type" header="Type" editor={typeEditor} style={{ height: '3.5em' }}></Column>
//                 </TreeTable>
//             </div>
//         </div>
//     );
// }
                
// export default App


