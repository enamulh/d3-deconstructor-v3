D3 Deconstructor v3
===================

The D3 Deconstructor is a Google Chrome extension for extracting data from [D3.js](http://d3js.org) visualizations.  D3 _binds data_ to DOM elements when building a visualization.  Deconstructor extracts this data and the visual mark attributes (such as position, width, height, and color) for each element in a D3 visualization.  Then, elements are grouped by the type of data they are bound to.

Our deconstructor builds on Harper and Agrawala’s D3 Deconstructor (http://vis.berkeley.edu/papers/d3decon/) which focused on recovering the data, the marks and the encodings from a D3 chart. We extended the original D3 deconstructor to build a search engine for visualization (https://www.yorku.ca/enamulh/vis-search/). The detailed list of extensions made in this version is provided in the paper:

Enamul Hoque and Maneesh Agrawala, Searching the Visual Style and Structure of D3 Visualizations, IEEE Transactions on Visualization and Computer Graphics, 2019. 

For citation please use:

@inproceedings{hoque-vis-search-2019,
  title={Searching the Visual Style and Structure of D3 Visualizations},
  author={Hoque, Enamul and  Agrawala, Maneesh},
  booktitle={IEEE Transactions on Visualization and Computer Graphics (Proc IEEE InfoVis 2019)},
  year={2019},
  organization={IEEE}
}


### Usage

To extract data from a D3 visualization the user right clicks on the visualization and selects "Deconstruct Visualization" in the context menu.  Deconstructor then creates a window showing the data tables for each group of elements.  Then, you can save visualization data as JSON or CSV.

In addition to data and mark attributes, Deconstructor extracts the mappings between the data and marks in the visualizations.  These mappings are saved when saving as JSON only.  JSON output is an array of "schema" objects which have several properties:

* **data** - The data table for the visualization, represented as an object whose keys are the data column names and the value for each key is the array of data values in the column.
* **attrs** - The mark attribute table, represented using an object similar to *data*.
* **mappings** - A list of mappings found for the group of marks.  Each mapping is an object with several properties:
  * *type* - The type of mapping; we extract mappings which are linear (quantitative) and one-to-one correspondences between data and attributes (nominal).
  * *data* - Either a single data field name or an array of data field names for the mapping.
  * *attr* - The mapped attribute.
  * *params* - A set of parameters that describe the mapping.
* **ids** - A list containing a unique ID for each node, representing its order in a traversal of its SVG tree. 

### Build

**Note:** You must have [Node](http://nodejs.org/) installed to build Deconstructor.

To build Deconstructor, first clone this repository and navigate to the cloned folder.  Then, install dependencies via NPM and run [Browserify](http://browserify.org/).

    git clone git://github.com/enamulh/d3-deconstructor-v3
    
    cd d3-deconstructor-v3
    npm install
    node_modules/grunt-cli/bin/grunt browserify

Finally, navigate to [chrome://extensions](chrome://extensions), click "Load unpacked extension..." and select the cloned folder.

There are two possible ways to run the deconstructor.In the default mode, you can go to a webpage and click on the Deconstructor Chrome extension icon which will automatically show the deconstructor data in a new page.

However, if you wish to run the Deconstructor automatically and store the results in the server you can change the following to parameters:
js/injected.js: set *sendDataToServer = true;*
js/injected.js: set *DeconstrucOnLoad = true;*
Then recompile code again by using:

    node_modules/grunt-cli/bin/grunt browserify

You will also need to run the node server by using following commands:

    cd server
    npm install
    node serverD3Scrapper.js 

**Known issues:** 1) Right now the deconstructor cannot extract data directly if the visualization is embedded within an *iframe*. However, it saves all the iframe urls in the iframe_url.csv file. Therefore, by loading the urls from the  iframe_url.csv, it is possible to deconstructor such visualizations.
     


