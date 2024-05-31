const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 4,
    height: 54.5,
    width: "100%",
    paddingHorizontal: 10,
    color: "black",
    fontSize: 16,
    position: "relative",
    backgroundColor: "white",
  },
  inputLabel: {},
  clearButton: {
    position: "absolute",
    right: 10,
    top: "50%",
    height: 25,
    width: 25,
    transform: [{ translateY: -12.5 }],
  },
  baseButton: {
    width: "100%",
    height: 56,
    backgroundColor: "#015BAA",
    borderRadius: 28,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonGreyShadow: {
    width: "100%",
    height: 56,
    backgroundColor: "#F0F2F9",
    borderRadius: 28,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  baseButtonText: {
    color: "white",
    fontFamily: "SpaceMono",
    fontSize: 16,
  },

  flexJustifyBetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  flexColumn: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  card: {
    width: "100%",
    height: 48,
    minHeight: 48,
    borderRadius: 8,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 5,
    marginBottom: 10,
    flexDirection: "row",
    paddingHorizontal: 12,
    fontSize: 10,
  },
  cardDefault: {
    backgroundColor: "#e5e5e5",
  },
  cardSuccess: {
    backgroundColor: "#82B452",
  },
  cardDanger: {
    backgroundColor: "#ED2337",
  },
  cardWarning: {
    backgroundColor: "#eddc23",
  },
  textSm: {
    fontSize: 12,
  },
  textGray: {
    color: "#8D95A9",
  },
  textWhite: {
    color: "white",
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 20,
    backgroundColor: "#82B452",
  },
};

export default styles;
