import React, {useState} from "react";
import {Collapse, Divider, List, ListItem, ListItemIcon, ListItemText, Typography,} from "@material-ui/core";
import {Link} from "react-router-dom";
import classnames from "classnames";
import Icon from "@material-ui/core/Icon";
import useStyles from "./styles";

import Dot from "../../../components/Sidebar/components/Dot";

export default function PageLink({
  link,
  icon,
  label,
  childPages,
  isSidebarOpened,
  nested,
  type,
}) {
  const classes = useStyles();

  // local
  const [isOpen, setIsOpen] = useState(true);

  if (type === "title")
    return (
      <Typography
        className={classnames(classes.linkText, classes.sectionTitle, {
          [classes.linkTextHidden]: !isSidebarOpened,
        })}
      >
        {label}
      </Typography>
    );

  if (type === "divider") return <Divider className={classes.divider} />;

  if (!childPages)
    return (
      <ListItem
        button
        component={link && Link}
        className={classes.link}
        classes={{
          root: classnames(classes.linkRoot, {
            [classes.linkActive]: false,
            [classes.linkNested]: nested,
          }),
        }}
        disableRipple
      >
        <ListItemIcon
          className={classnames(classes.linkIcon, {
            [classes.linkIconActive]: false,
          })}
        >
          {nested ? <Dot color={false && "primary"} /> : <Icon>{icon}</Icon>}
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: classnames(classes.linkText, {
              [classes.linkTextActive]: false,
              [classes.linkTextHidden]: !isSidebarOpened,
            }),
          }}
          primary={label}
        />
      </ListItem>
    );

  return (
    <>
      <ListItem
        button
        component={link && Link}
        onClick={toggleCollapse}
        className={classes.link}
        disableRipple
      >
        <ListItemIcon
          className={classnames(classes.linkIcon, {
            [classes.linkIconActive]: false,
          })}
        >
            <Icon>{icon}</Icon>
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: classnames(classes.linkText, {
              [classes.linkTextActive]: false,
              [classes.linkTextHidden]: !isSidebarOpened,
            }),
          }}
          primary={label}
        />
      </ListItem>
      {childPages && (
        <Collapse
          in={isOpen && isSidebarOpened}
          timeout="auto"
          unmountOnExit
          className={classes.nestedList}
        >
          <List component="div" disablePadding>
            {childPages.map(childrenLink => (
              <PageLink
                key={childrenLink && childrenLink.link}
                isSidebarOpened={isSidebarOpened}
                classes={classes}
                nested
                {...childrenLink}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );

  // ###########################################################

  function toggleCollapse(e) {
    if (isSidebarOpened) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  }
}
