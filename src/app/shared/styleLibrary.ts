export const StyleLibrary = [
  {
    genere: 'coreUI',

    // basic component
    text: {
      opacity: '0',
      fontSize: '25',
      fontColor: 'black'
    },

    button: {
      fontSize: '18',
      fontColor: '#fff',
      fillColor: '#5bc0de',
      rounded: true,
      strokeColor: '#269abc'
    },

    dropdown: {
      dropdownBox: {
        opacity: '0',
        strokeColor: '#ffffff'
      },

      dropdownHeader: {
        fontSize: '14',
        fontColor: '#333333',
        rounded: true,
        strokeColor: '#a6a6a6',
        fillColor: '#ffffff',
        border: '#a6a6a6',

      },

      dropdownList: {
        strokeColor: '#c8c8c8',
        fillColor: '#ffffff',
        opacity: '0',
      },

      dropdownItem: {
        strokeColor: '#ffffff',
        fontColor: '#333333',
        fontSize: '14',
      },
    },

    icon: {},

    table: {
      tableBox: {
        opacity: '0',
        strokeColor: '#000000',
      },

      tableHeader: {
        fontStyle: 1,  //FONT_BOLD
        fillColor: '#ffffff',
        strokeColor: '#b8bcc2',
        fontColor: '#4f5d73',
        fontSize: '16',
        shadow: true,
      },

      tableData_white: {
        fillColor: '#ffffff',
        strokeColor: '#d8dbe0',
        fontColor: '#4f5d73',
        fontSize: '16',
        shadow: true,
      },

      tableData_grey: {
        fillColor: '#f1f4f6',
        strokeColor: '#d8dbe0',
        fontColor: '#4f5d73',
        fontSize: '16',
        shadow: true,
      },
    },

    // composite component
    card: {
      cardBox: {
        fillColor: '#ffffff',
        strokeColor: '#000000'
      },
      cardHeader: {
        fillColor: '#edefef',
        strokeColor: '#000000',
        fontSize: '30',
      }
    },

    breadcrumb: {
      breadcrumbBox:{
        fillColor: '#edefef',
        strokeColor: '#ffffff'
      },
      breadcrumbIndicator: {
          shape: "line",
          rotation: 120,
          strokeWidth: 1.8,
      }
    },

    input: {
      strokeColor: '#000000',
      fillColor: "#ffffff"
    },

    Layout1Header:{
      border: '#000000',
      fillColor: "#ffffff"
    },

    Layout1Sidebar:{
      border: '#000000',
      fillColor: "#2f353a"
    }
  }
];
