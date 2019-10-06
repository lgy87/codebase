import { Button, ButtonGroup } from "@blueprintjs/core"

function Switch({ items, activeIndex, setActiveIndex = ra.noop }) {
  return (
    <ButtonGroup css={switchStyle}>
      {items.map((item, index) => (
        <Button
          key={index}
          {...item}
          active={activeIndex === index}
          onClick={() => setActiveIndex(index)}
        />
      ))}
    </ButtonGroup>
  )
}
