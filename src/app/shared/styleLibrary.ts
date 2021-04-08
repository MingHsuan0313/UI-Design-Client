export const StyleLibrary = [
  {
    genere: "coreUI",
    fontSize: 16,
    text: {
      text_black: {
        strokeColor: "#ffffff",
        fillColor: "#ffffff",
        fontSize: "16",
        fontColor: "black"
      },
      text_blue: {
        strokeColor: "#ffffff",
        fillColor: "#ffffff",
        fontSize: "16",
        fontColor: "#20a8d8"
      },
      sidebar_theme_link: {
        align: "left",
        fontSize: "20",
        strokeColor: "#2f353a",
        fillColor: "#2f353a",
        fontColor: "#ffffff"
      },
      sidebar_page_link: {
        align: "left",
        fontSize: "20",
        strokeColor: "#2f353a",
        fillColor: "#2f353a",
        fontColor: "#ffffff"
      }
    },

    tag: {
      fontSize: "16",
      rounded: "1",
      fillColor: "#AAAAAA"
    },
    tagclicked: {
      fontSize: "16",
      fontColor: "#FFFFFF",
      fillColor: "#0044BB",
      rounded: "1",
    },

    page: {
      align: "left",
      fillColor: "#FFFFFF",
      fontSize: "16"
    },
    pagebox: {
      align: "left",
      fillColor: "#FFFFFF",
      fontSize: "16",
      shape: "image",
    },
    
    tree: {
      align: "left",
      fillColor: "#FFFFFF",
      shape: "image",
    },
    treeIconDown: {
      align: "left",
      fillColor: "#FFFFFF",
      shape: "image",
      image: "assets/keyboard_arrow_down-24px.svg"
    },
    treeIconRight: {
      align: "left",
      fillColor: "#FFFFFF",
      shape: "image",
      image: "assets/keyboard_arrow_right-24px.svg"
    },


    button: {
      fontSize: "16",
      fontColor: "#333333",
      fillColor: "#ffffff",
      rounded: "1",
      shadow: "1",
      strokeColor: "#269abc",
    },

    dropdown: {
      dropdownBox: {
        opacity: "0",
        strokeColor: "#ffffff"
      },

      dropdownHeader: {
        fontSize: "16",
        fontColor: "#333333",
        rounded: "1",
        strokeColor: "#a6a6a6",
        fillColor: "#ffffff",
      },

      dropdownList: {
        strokeColor: "#c8c8c8",
        fillColor: "#ffffff",
        opacity: "0",
      },

      dropdownItem: {
        strokeColor: "#a6a6a6",
        fontColor: "#333333",
        fontSize: "16",
        fillColor: "#ffffff",
      },
    },

    icon:{

      fillColor: "#5bc0de",
      rounded: "1",
      strokeColor: "#269abc",
      shape: "image",
      image: "assets/icon/icon1.svg"

    },
    spinner:{

    fillColor: "#5bc0de",
    rounded: "1",
    strokeColor: "#269abc",
    shape: "image",
    image: "assets/icon/spinner.svg"

    },

    progress: {
      progressBox: {
        opacity: "0",
        strokeColor: "#000000",
      },
      progressBarBody: {
        align: "left",
        fontSize: "16",
        fontColor: "#000000",
        fillColor: "#99CCFF",
        rounded: "1",
        strokeColor: "#269abc"
      },
      progressBarSteps: {
        fontSize: "20",
        strokeColor: "#2f353a",
        align: "left",
        shape: "doubleEllipse",
        fillColor: "#CACFD2",
        fontColor: "#ffffff"
      }
    },
    checkbox: {
      checkboxBox: {
        opacity: "0",
        strokeColor: "#000000",
      },

      checkboxText: {
        strokeColor: "#ffffff",
        fillColor: "#f7f7f7",
        fontSize: "16",
        fontColor: "black"
      },

      checked: {
        fillColor: "#5bc0de",
        rounded: "1",
        strokeColor: "#269abc",
        shape: "image",
        image: "assets/icon/checkbox-checked.svg"
      },

      unchecked: {
        fillColor: "#5bc0de",
        rounded: "1",
        strokeColor: "#269abc",
        shape: "image",
        image: "assets/icon/checkbox-unchecked.svg"
      },
      
      indeterminate: {
        checked: {
          fillColor: "#5bc0de",
          rounded: "1",
          strokeColor: "#269abc",
          shape: "image",
          image: "assets/icon/checkbox-indeterminate.svg"
        }
      }

    },

    radioButton: {
      radioButtonBox: {
        opacity: "0",
        strokeColor: "#000000",
      },

      radioButtonText: {
        strokeColor: "#ffffff",
        fillColor: "#f7f7f7",
        fontSize: "16",
        fontColor: "gray"
      },

      checked: {
        fillColor: "#5bc0de",
        rounded: "1",
        strokeColor: "#269abc",
        shape: "image",
        image: "assets/icon/radio-button.svg"
      },

      unchecked: {
        fillColor: "#5bc0de",
        rounded: "1",
        strokeColor: "#269abc",
        shape: "image",
        image: "assets/icon/radio-button-2.svg"
      },

    },

    listBox: {
      listBoxBox: {
        opacity: "0",
        strokeColor: "#000000",
      },

      listBoxHeader: {
        strokeColor: "#ffffff",
        fillColor: "#f7f7f7",
        fontSize: "16",
        fontColor: "black"
      },

      listBoxArrow: {
        fillColor: "#5bc0de",
        strokeColor: "#269abc",
        shape: "image",
        image: "assets/icon/checkbox-unchecked.svg"
      },

      listBoxScroll: {
        fillColor: "#c7c7c7"
      },
      
      listBoxOption: {
        strokeColor: "#ffffff",
        fillColor: "#f7f7f7",
        fontSize: "16",
        fontColor: "black"
      }

    },

    table: {
      tableBox: {
        opacity: "0",
        strokeColor: "#000000",
      },

      tableHeader: {
        fontStyle: 1,  // FONT_BOLD
        fillColor: "#ffffff",
        strokeColor: "#b8bcc2",
        fontColor: "#4f5d73",
        fontSize: "20",
        shadow: "1",
      },

      tableData_white: {
        fillColor: "#ffffff",
        strokeColor: "#d8dbe0",
        fontColor: "#4f5d73",
        fontSize: "20",
        shadow: "1",
      },

      tableData_grey: {
        fillColor: "#f1f4f6",
        strokeColor: "#d8dbe0",
        fontColor: "#4f5d73",
        fontSize: "20",
        shadow: "1",
      },
    },

    // composite component
    card: {
      cardBox: {
        fillColor: "#ffffff",
        strokeColor: "#c8ced3"
      },
      cardHeader: {
        fillColor: "#edefef",
        strokeColor: "#c8ced3",
        fontColor: "000000",
        fontSize: "30",
      }
    },

    form: {
      formBox: {
        strokeColor: "#000000",
        fillColor: "#ffffff",
        rounded: "0.5",
        shadow: "0",
      }
    },

    dialog: {
      formBox: {
        strokeColor: "#000000",
        fillColor: "#ffffff",
        rounded: "0.5",
        shadow: "0",
      },
    },

    expansionPanel: {
      formBox: {
        //strokeColor: "#000000",
        //fillColor: "#ffffff",
        //rounded: "0.5",
        shadow: "0",
        fontSize: "16",
        fontColor: "#333333",
        rounded: "1",
        strokeColor: "#a6a6a6",
        fillColor: "#ffffff",
      }
    },

    breadcrumb: {
      breadcrumbBox: {
        fillColor: "#ffffff",
        strokeColor: "#c8ced3"
      },
      breadcrumbIndicator: {
        shape: "line",
        rotation: 120,
        strokeWidth: 1.8,
      }
    },

    input: {
      fontColor: "#c8ced3",
      strokeColor: "#000000",
      fillColor: "#ffffff",
      align:"left",
      rounded: "1",
    },

    Layout1: {
      fillColor: "#ffffff",
      strokeColor: "#c8ced3"
    },

    Layout1Header: {
      fillColor: "#ffffff",
      strokeColor: "#c8ced3"
    },

    Layout1Sidebar: {
      fillColor: "#2f353a",
      strokeColor: "#c8ced3"
    },

    Layout1Footer: {
      fillColor: "#f0f3f5",
      strokeColor: "#c8ced3"
    },

    Layout1Body: {
      fillColor: "#ffffff",
      strokeColor: "#c8ced3"
    },

    Layout1Asidebar: {
      fillColor: "#ffffff",
      strokeColor: "#c8ced3"
    },

    Arrow: {
      shape: "polyline",
    }
  }
];
