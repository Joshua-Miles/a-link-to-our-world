const FS = require("fs-extra");
const Path = require("path");

const pascalCased = (str) => {
  let result = str.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });

  result = result.slice(0, 1).toUpperCase() + result.slice(1);

  result = result.replaceAll("-", "");

  return result;
};

async function main() {
  const sourceIconsPath = Path.join(__dirname, "icons.json");
  const outputPath = Path.join(__dirname, "..", "icons");

  console.log(sourceIconsPath);

  const icons = JSON.parse((await FS.readFile(sourceIconsPath)).toString());

  await FS.remove(outputPath);

  await FS.mkdir(outputPath);

  const iconNames = Object.keys(icons);

  const componentNames = await Promise.all(
    iconNames.map(async (iconName) => {
      const icon = icons[iconName];

      iconName = pascalCased(iconName);

      if (!isNaN(iconName.charAt(0))) {
        iconName = `Number${iconName}`;
      }
      const componentName = `${iconName}Icon`;

      const svg = icon.svg.solid ?? icon.svg.regular ?? icon.svg.brands;

      const iconComponentDef = buildIcon(componentName, svg.viewBox, svg.path);

      const fileName = `${componentName}.tsx`;

      const iconOutputPath = Path.join(outputPath, fileName);

      await FS.writeFile(iconOutputPath, iconComponentDef);

      return componentName;
    })
  );

  const indexPath = Path.join(outputPath, "index.ts");

  const indexDef = componentNames
    .map((componentName) => `export * from './${componentName}';`)
    .join("\n");

  await FS.writeFile(indexPath, indexDef);
}

main();

const buildIcon = (
  name,
  viewBox,
  path
) => `import { Svg, SvgProps, Path } from 'react-native-svg';
import { useParentContext } from 'ui-core';

export function ${name}(props: SvgProps) {
    const { parentTextColor } = useParentContext()

    return (
        <Svg width={24} height={24} viewBox="${viewBox.join(
          " "
        )}" fill={parentTextColor} {...props}>
            <Path d="${path}"/>
        </Svg>
    )
}

`;
