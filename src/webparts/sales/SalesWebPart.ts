import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'SalesWebPartStrings';
import Sales from './components/Sales';
import { ISalesProps } from './components/ISalesProps';

export interface ISalesWebPartProps {
  description: string;
}

export default class SalesWebPart extends BaseClientSideWebPart<ISalesWebPartProps> {
  public render(): void {
    const element: React.ReactElement<ISalesProps> = React.createElement(
      Sales,
      {
        description: this.properties.description,
        siteUrl: 'https://2zht75.sharepoint.com/sites/AutoZee',
        spHttpClient: this.context.spHttpClient,
      }
    );
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
